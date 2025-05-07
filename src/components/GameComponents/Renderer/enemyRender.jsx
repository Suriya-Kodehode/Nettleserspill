import { computeEnemyDrawProps } from "../../GameUtility/computeEnemyProps.jsx";
import { enemiesData } from "../../GameData/enemyData.jsx";
import { playerTakeDamage } from "../../GameComponents/playerTakeDamage.jsx";

export const renderEnemiesOnCanvas = (
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


    const lastKeyframe = enemyPath[enemyPath.length - 1];
    if (cycleTime >= lastKeyframe.time) {
      if (!enemy.hitPlayer) {
        playerTakeDamage(enemy.damage);
        enemy.hitPlayer = true;
      }
      return;
    }

    const { finalX, finalY, opacity } = computeEnemyDrawProps(
      cycleTime,
      enemyPath,
      offsetX,
      offsetY
    );
    const baseX = finalX + enemy.spriteOffset * offsetMultiplier;
    const baseY = finalY;

    const spriteData = enemiesData[enemy.sprite];
    if (!spriteData) {
      console.error(`Missing enemy data for sprite: ${enemy.sprite}`);
      return;
    }
    const { pathOffset = { x: 0, y: 0 } } = spriteData;
    const adjustedX = baseX + pathOffset.x;
    const adjustedY = baseY + pathOffset.y;

    const drawnWidth = spriteData.width * scale;
    const drawnHeight = spriteData.height * scale;
    const centerX = adjustedX + spriteData.width / 2;
    const centerY = adjustedY + spriteData.height / 2;
    let drawX = centerX - drawnWidth / 2;
    let drawY = centerY - drawnHeight / 2;

    if (spriteData.offsetAdjustments) {
      drawX += spriteData.offsetAdjustments.x || 0;
      drawY += spriteData.offsetAdjustments.y || 0;
    }

    let spriteToDraw = null;
    const frames = animatedFramesRef.current[enemy.sprite];
    if (frames && frames.length > 0) {
      const frameDelay = frames.frameDelay || spriteData.frameDelay || 100;
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
      console.error(`Sprite image not loaded for ${enemy.sprite}`);
    }
    context.restore();

    if (selectedEnemy && enemy === selectedEnemy) {
      let hitbox = spriteData.defaultHitbox;
      const outlineSettings = spriteData.outline || {};
      const margin = outlineSettings.margin !== undefined ? outlineSettings.margin : 0;
      hitbox = {
        x: hitbox.x,
        y: hitbox.y,
        width: hitbox.width + margin,
        height: hitbox.height + margin,
      };


      const shiftX = outlineSettings.shiftX !== undefined ? outlineSettings.shiftX : 0;
      const shiftY = outlineSettings.shiftY !== undefined ? outlineSettings.shiftY : 0;
      
      const outlineColor = outlineSettings.outlineColor || outlineSettings.color || "red";
      const outlineLineWidth = outlineSettings.lineWidth !== undefined ? outlineSettings.lineWidth : 3;
      const outlineAlpha = outlineSettings.alpha !== undefined ? outlineSettings.alpha : 0.7;

      const outlineWidth = hitbox.width * scale;
      const outlineHeight = hitbox.height * scale;
      const outlineX = centerX - outlineWidth / 2 - shiftX;
      const outlineY = centerY - outlineHeight / 2 - shiftY;

      context.save();
      context.globalAlpha = outlineAlpha;
      context.strokeStyle = outlineColor;
      context.lineWidth = outlineLineWidth;
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
  globalOffsetX,
  globalOffsetY,
  offsetMultiplier,
  scale = 1
) => {
  const currentTime = performance.now();
  for (let enemy of enemies) {
    const cycleTime = currentTime - enemy.spawnTime;
    const { finalX, finalY } = computeEnemyDrawProps(
      cycleTime,
      enemyPath,
      globalOffsetX,
      globalOffsetY
    );
    const baseX = finalX + enemy.spriteOffset * offsetMultiplier;
    const baseY = finalY;
    const spriteData = enemiesData[enemy.sprite];
    if (!spriteData) continue;
    
    const { pathOffset = { x: 0, y: 0 } } = spriteData;
    const adjustedX = baseX + pathOffset.x;
    const adjustedY = baseY + pathOffset.y;
    const drawnWidth = spriteData.width * scale;
    const drawnHeight = spriteData.height * scale;
    const centerX = adjustedX + spriteData.width / 2;
    const centerY = adjustedY + spriteData.height / 2;
    let drawX = centerX - drawnWidth / 2;
    let drawY = centerY - drawnHeight / 2;
    
    if (spriteData.offsetAdjustments) {
      drawX += spriteData.offsetAdjustments.x || 0;
      drawY += spriteData.offsetAdjustments.y || 0;
    }
    
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
