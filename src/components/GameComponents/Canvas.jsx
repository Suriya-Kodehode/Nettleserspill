import { useRef, useEffect, useState, useMemo } from "react";
import { getEnemyPath } from "../GameUtility/enemyPath.jsx";
import { mapConfigs } from "../GameUtility/mapConfig.jsx";
import { enemySprites } from "../GameUtility/enemySprites.jsx";
import { spawnEnemies } from "../GameComponents/spawnEnemies.jsx";

import { createBackgroundCanvas } from "../GameUtility/backgroundRenderer.jsx";
import { computeEnemyDrawProps } from "../GameUtility/computeEnemyProps.jsx";

import { player } from "../GameUtility/PlayerStatus.jsx";

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
  const gameMapRef = useRef(null);

  const mapConfig = mapConfigs[mapName];
  const enemyPath = useMemo(() => getEnemyPath(mapName), [mapName]);

  useEffect(() => {
    if (!gameMapRef.current) {
      gameMapRef.current = new Image();
    }
    gameMapRef.current.src = mapConfig.mapSrc;
  }, [mapConfig.mapSrc]);

  const { images: enemyImage, loadStatus: isEnemyLoaded } = preloadSprites(sprites);

  const [enemies, setEnemies] = useState([]);
  const enemiesRef = useRef([]);
  useEffect(() => {
    enemiesRef.current = enemies;
  }, [enemies]);

  const timeoutIdsRef = useRef([]);

  const bgCanvasRef = useRef(null);
  const [bgLoaded, setBgLoaded] = useState(false);

  const bgLoadedRef = useRef(bgLoaded);
  useEffect(() => {
    bgLoadedRef.current = bgLoaded;
  }, [bgLoaded]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    const { width, height, offsetX, offsetY, spawnDelay } = mapConfig;
    
    const enemyPathLength = enemyPath.length;
    const startKeyframe = enemyPath[0];
    const endKeyframe = enemyPath[enemyPathLength - 1];
    
    if (gameMapRef.current.complete) {
      bgCanvasRef.current = createBackgroundCanvas(gameMapRef.current, width, height);
      setBgLoaded(true);
      console.log("Map image already complete.");
    } else {
      gameMapRef.current.onload = () => {
        bgCanvasRef.current = createBackgroundCanvas(gameMapRef.current, width, height);
        setBgLoaded(true);
        console.log("Map image loaded via onload.");
      };
      gameMapRef.current.onerror = () => {
        console.error(`Failed to load map image: ${mapConfig.mapSrc}`);
      };
    }
    
    const { spawnWave, timeoutIds } = spawnEnemies(mapConfig, sprites);
    timeoutIdsRef.current = timeoutIds;
    const startTimeout = setTimeout(() => spawnWave(setEnemies), spawnDelay);
    timeoutIdsRef.current.push(startTimeout);
    
    let animationFrameId;
    const render = (timestamp) => {
      context.clearRect(0, 0, width, height);
      
      if (bgLoadedRef.current && bgCanvasRef.current) {
        context.drawImage(bgCanvasRef.current, 0, 0);
      }
      
      const currentEnemies = enemiesRef.current;
      for (let i = 0, len = currentEnemies.length; i < len; i++) {
        const enemy = currentEnemies[i];
        const cycleTime = timestamp - enemy.spawnTime;
        if (cycleTime < 0) continue;
  
        if (cycleTime >= endKeyframe.time) {
          if (!enemy.hitPlayer) {
            player.hp -= 1;
            enemy.hitPlayer = true;
          }
          continue;
        }
  
        const { finalX, finalY, opacity } = computeEnemyDrawProps(
          cycleTime,
          enemyPath,
          offsetX,
          offsetY
        );
  
        context.save();
        context.globalAlpha = opacity;
        const spriteImage = enemyImage[enemy.sprite];
        if (spriteImage && isEnemyLoaded[enemy.sprite]) {
          const spriteData = enemySprites[enemy.sprite];
          context.drawImage(
            spriteImage,
            finalX,
            finalY,
            spriteData.width,
            spriteData.height
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
