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
};

const Canvas = ({ mapName = "newDawn", sprites = ["monkey"], style = {} }) => {
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

    const { spawnWave, timeoutIds } = spawnEnemies(mapConfig, sprites);
    timeoutIdsRef.current = timeoutIds;
    const startTimeout = setTimeout(() => spawnWave(setEnemies), mapConfig.spawnDelay);
    timeoutIdsRef.current.push(startTimeout);

    const { width, height, offsetX, offsetY, spawnDelay } = mapConfig;
    const enemyPathLength = enemyPath.length;
    const startKeyframe = enemyPath[0];
    const endKeyframe = enemyPath[enemyPathLength - 1];

    const render = (timestamp) => {
      context.clearRect(0, 0, width, height);

      if (isMapLoaded) {
        context.drawImage(gameMap, 0, 0, width, height);
      }

      const enemyList = enemiesRef.current;
      const enemyCount = enemyList.length;
      for (let i = 0; i < enemyCount; i++) {
        const enemy = enemyList[i];
        const cycleTime = timestamp - enemy.spawnTime;
        if (cycleTime < 0) continue;

        let prevKey = startKeyframe,
          nextKey = endKeyframe;

        for (let j = 0; j < enemyPathLength - 1; j++) {
          const keyA = enemyPath[j],
            keyB = enemyPath[j + 1];
          if (cycleTime >= keyA.time && cycleTime <= keyB.time) {
            prevKey = keyA;
            nextKey = keyB;
            break;
          }
        }

        const segmentDuration = nextKey.time - prevKey.time;
        const progress = segmentDuration !== 0 ? (cycleTime - prevKey.time) / segmentDuration : 0;
        const posX = prevKey.x + (nextKey.x - prevKey.x) * progress;
        const posY = prevKey.y + (nextKey.y - prevKey.y) * progress;
        const opacity = prevKey.opacity + (nextKey.opacity - prevKey.opacity) * progress;

        const finalX = posX + offsetX;
        const finalY = posY + offsetY;

        context.save();
        context.globalAlpha = opacity;

        const spriteImage = enemyImage[enemy.sprite];
        if (spriteImage && isEnemyLoaded[enemy.sprite]) {
          context.drawImage(
            spriteImage,
            finalX,
            finalY,
            enemySprites[enemy.sprite].width,
            enemySprites[enemy.sprite].height
          );
        } else {
          console.error(`Sprite image not loaded: ${enemy.sprite}`);
        }
        context.restore();
      }

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
      style={{ border: "1px solid #000", ...style }}
    >
      Your browser does not support the HTML5 canvas tag.
    </canvas>
  );
};

export default Canvas;
