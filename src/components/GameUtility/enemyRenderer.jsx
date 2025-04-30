
import { computeEnemyDrawProps } from "./computeEnemyProps.jsx";
import { enemiesData } from "../GameData/enemyData.jsx";
import { playerTakeDamage } from "../GameComponents/playerTakeDamage.jsx";

export const renderEnemies = (
  context,
  enemies,
  enemyPath,
  offsetX,
  offsetY,
  offsetMultiplier,
  timestamp,
  enemyImages,
  animatedFramesRef,
  selectedEnemy,
  scale = 1
) => {
  enemies.forEach((enemy) => {
    const cycleTime = timestamp - enemy.spawnTime;
    if (cycleTime < 0) return;
    
    // Check if enemy has reached the end of its path.
    const lastKeyframe = enemyPath[enemyPath.length - 1];
    if (cycleTime >= lastKeyframe.time) {
      if (!enemy.hitPlayer) {
        playerTakeDamage(enemy.damage);
        enemy.hitPlayer = true;
      }
      return;
    }
    
    // Compute the base (unscaled) position.
    const { finalX, finalY, opacity } = computeEnemyDrawProps(
      cycleTime,
      enemyPath,
      offsetX,
      offsetY
    );
    const adjustedX = finalX + enemy.spriteOffset * offsetMultiplier;
    const adjustedY = finalY;
    
    // Get sprite metadata.
    const spriteData = enemiesData[enemy.sprite];
    
    // Compute drawn dimensions based on scaling.
    const drawnWidth = spriteData.width * scale;
    const drawnHeight = spriteData.height * scale;
    // Compute the center of the unscaled sprite.
    const centerX = adjustedX + spriteData.width / 2;
    const centerY = adjustedY + spriteData.height / 2;
    // Compute top-left for the scaled sprite so its center remains unchanged.
    const drawX = centerX - drawnWidth / 2;
    const drawY = centerY - drawnHeight / 2;
    
    // Choose the correct sprite/frame.
    let spriteToDraw = null;
    const frames = animatedFramesRef.current[enemy.sprite];
    if (frames && frames.length > 0) {
      const frameDelay = 100;
      const frameIndex = Math.floor(timestamp / frameDelay) % frames.length;
      spriteToDraw = frames[frameIndex];
    } else {
      spriteToDraw = enemyImages[enemy.sprite];
    }
    
    context.save();
    context.globalAlpha = opacity;
    if (spriteToDraw) {
      context.drawImage(spriteToDraw, drawX, drawY, drawnWidth, drawnHeight);
    } else {
      console.error(`Sprite image not loaded: ${enemy.sprite}`);
    }
    context.restore();
    
    // Draw an outline using defaultHitbox data (centered)
    if (selectedEnemy && enemy === selectedEnemy) {
      const hitbox = spriteData.defaultHitbox;
   
      const outlineWidth = hitbox.width * scale;
      const outlineHeight = hitbox.height * scale;
    
      const outlineX = centerX - outlineWidth / 2;
      const outlineY = centerY - outlineHeight / 2;
      
      context.save();
      context.globalAlpha = 0.5; 
      context.strokeStyle = "red";
      context.lineWidth = 3;
      context.strokeRect(outlineX, outlineY, outlineWidth, outlineHeight);
      context.restore();
    }
  });
};

export const getClickedEnemy = (
  clickX,
  clickY,
  enemies,
  enemyPath,
  offsetX,
  offsetY,
  offsetMultiplier,
  scale = 1
) => {
  for (let enemy of enemies) {
    const { finalX, finalY } = computeEnemyDrawProps(
      performance.now() - enemy.spawnTime,
      enemyPath,
      offsetX,
      offsetY
    );
    const spriteData = enemiesData[enemy.sprite];
    const adjustedX = finalX + enemy.spriteOffset * offsetMultiplier;
    const adjustedY = finalY;
    const drawnWidth = spriteData.width * scale;
    const drawnHeight = spriteData.height * scale;
    const centerX = adjustedX + spriteData.width / 2;
    const centerY = adjustedY + spriteData.height / 2;
    const drawX = centerX - drawnWidth / 2;
    const drawY = centerY - drawnHeight / 2;
    if (
      clickX >= drawX &&
      clickX <= drawX + drawnWidth &&
      clickY >= drawY &&
      clickY <= drawY + drawnHeight
    ) {
      return enemy;
    }
  }
  return null;
};
