import { useRef, useEffect, useState } from "react";

import { getEnemyPath } from "../GameUtility/enemyPath.jsx";
import { mapConfigs } from "../GameUtility/mapConfig.jsx";
import { enemySprites } from "../GameUtility/enemySprites.jsx";
import { spawnEnemies } from "../GameComponents/spawnEnemies.jsx";

const preloadSprites = (sprites) => {
  const images = {};
  const loadStatus = {};
  sprites.forEach((sprite) => {
    const img = new Image();
    img.src = enemySprites[sprite].src;
    images[sprite] = img;

    img.onload = () => {
      loadStatus[sprite] = true;
    };
    img.onerror = () => {
      console.error(`Failed to load sprite image: ${sprite}`);
    };
  });
  return { images, loadStatus };
}

const Canvas = ({ mapName = 'newDawn', sprites = ['monkey'], style = {} }) => {
  const canvasRef = useRef(null);
  const mapConfig = mapConfigs[mapName];
  const enemyPath = getEnemyPath(mapName);

  const gameMap = new Image();
  gameMap.src = mapConfig.mapSrc;

  const { images: enemyImage, loadStatus: isEnemyLoaded } = preloadSprites(sprites);
  
  const [enemies, setEnemies] = useState([]);
  const enemiesRef = useRef([]);
  useEffect(() => {
    enemiesRef.current = enemies;
  }, [enemies]);

  const timeoutIdsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");

    let animationFrameId;
    let isMapLoaded = false;
    gameMap.onload = () => {
      isMapLoaded = true;
    };
    gameMap.onerror = () => {
      console.error(`Failed to load map image: ${mapConfig.mapSrc}`);
    };

    const { spawnEnemy, timeoutIds } = spawnEnemies(mapConfig, sprites);
    timeoutIdsRef.current = timeoutIds;

    const startTimeout = setTimeout(() => spawnEnemy(setEnemies), mapConfig.spawnDelay);
    timeoutIdsRef.current.push(startTimeout);

    const lerp = (a, b, t) => a + (b - a) * t;
    const interpolateKeyframes = (prev, next, currentTime) => {
      const segmentDuration = next.time - prev.time;
      const progress = (currentTime - prev.time) / segmentDuration;
      return {
        x: lerp(prev.x, next.x, progress),
        y: lerp(prev.y, next.y, progress),
        opacity: lerp(prev.opacity, next.opacity, progress),
      }
    };

    const render = (timestamp) => {
      context.clearRect(0, 0, mapConfig.width, mapConfig.height);

      if (isMapLoaded) {
        context.drawImage(gameMap, 0, 0, mapConfig.width, mapConfig.height);
      }

      enemiesRef.current.forEach((enemy) => {
        const elapsedTime = timestamp;
        const cycleTime = elapsedTime - enemy.spawnTime;
  
        if (cycleTime < 0) return;
  
        let prevKey = enemyPath[0],
            nextKey = enemyPath[enemyPath.length - 1];
  
        for (let i = 0; i < enemyPath.length - 1; i++) {
          if (cycleTime >= enemyPath[i].time && cycleTime <= enemyPath[i + 1].time) {
            prevKey = enemyPath[i];
            nextKey = enemyPath[i + 1];
            break;
          }
        }
  
        const enemyPos = interpolateKeyframes(prevKey, nextKey, cycleTime);
  
        const adjustedPos = {
          x: enemyPos.x + mapConfig.offsetX,
          y: enemyPos.y + mapConfig.offsetY,
          opacity: enemyPos.opacity,
        };
  
        context.save();
        context.globalAlpha = adjustedPos.opacity;
  
        const spriteImage = enemyImage[enemy.sprite];
        if (spriteImage && isEnemyLoaded[enemy.sprite]) {
          context.drawImage(
            spriteImage, 
            adjustedPos.x, 
            adjustedPos.y, 
            enemySprites[enemy.sprite].width, 
            enemySprites[enemy.sprite].height
          );
        } else {
          console.error(`Sprite image not loaded: ${enemy.sprite}`);
        }
        context.restore();
      });
  
      animationFrameId = requestAnimationFrame(render);
    };
    animationFrameId = requestAnimationFrame(render);
    
    return () => {
      timeoutIdsRef.current.forEach(clearTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mapConfig, sprites]);

  return (
    <canvas
      ref={canvasRef}
      width={mapConfig.width}
      height={mapConfig.height}
      style={{ border: '1px solid #000', ...style }}
    >
      Your browser does not support the HTML5 canvas tag.
    </canvas>
  );
};

export default Canvas;
