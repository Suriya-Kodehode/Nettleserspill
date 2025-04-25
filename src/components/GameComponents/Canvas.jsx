import { useRef, useEffect, useState, useMemo } from "react";
import { preloadStaticSprites, loadAnimatedFrames } from "../GameUtility/spriteLoader.jsx";
import { enemySprites } from "../GameUtility/enemySprites.jsx";
import { getEnemyPath } from "../GameUtility/enemyPath.jsx";
import { mapConfigs } from "../GameUtility/mapConfig.jsx";
import { spawnEnemies } from "../GameComponents/spawnEnemies.jsx";
import { createBackgroundCanvas } from "../GameUtility/backgroundRenderer.jsx";
import { computeEnemyDrawProps } from "../GameUtility/computeEnemyProps.jsx";
import { player } from "../GameUtility/PlayerStatus.jsx";

const Canvas = ({
  mapName = "newDawn",
  sprites = ["monkey"],
  style = {},
  offsetMultiplier = 3
}) => {
  const canvasRef = useRef(null);
  const gameMapRef = useRef(null);
  const bgCanvasRef = useRef(null);
  const timeoutIdsRef = useRef([]);
  const [enemies, setEnemies] = useState([]);
  const enemiesRef = useRef(enemies);
  const [bgLoaded, setBgLoaded] = useState(false);

  const { images: enemyImages } = preloadStaticSprites(sprites);

  const animatedFramesRef = useRef({});
  useEffect(() => {
    loadAnimatedFrames(sprites).then((mapping) => {
      animatedFramesRef.current = mapping;
    });
  }, [sprites]);

  useEffect(() => {
    enemiesRef.current = enemies;
  }, [enemies]);

  const bgLoadedRef = useRef(bgLoaded);
  useEffect(() => {
    bgLoadedRef.current = bgLoaded;
  }, [bgLoaded]);

  const mapConfig = mapConfigs[mapName];
  const enemyPath = useMemo(() => getEnemyPath(mapName), [mapName]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    const { width, height, offsetX, offsetY, spawnDelay } = mapConfig;

    if (!gameMapRef.current) {
      gameMapRef.current = new Image();
    }
    gameMapRef.current.src = mapConfig.mapSrc;
    if (gameMapRef.current.complete) {
      bgCanvasRef.current = createBackgroundCanvas(gameMapRef.current, width, height);
      setBgLoaded(true);
    } else {
      gameMapRef.current.onload = () => {
        bgCanvasRef.current = createBackgroundCanvas(gameMapRef.current, width, height);
        setBgLoaded(true);
      };
      gameMapRef.current.onerror = () => {
        console.error(`Failed to load map image: ${mapConfig.mapSrc}`);
      };
    }

    const { spawnWave, timeoutIds } = spawnEnemies(mapConfig, sprites);
    timeoutIdsRef.current = timeoutIds;
    const startTimeout = setTimeout(() => {
      spawnWave((enemyArr) => setEnemies(enemyArr));
    }, spawnDelay);
    timeoutIdsRef.current.push(startTimeout);

    let animationFrameId;
    const render = (timestamp) => {
      context.clearRect(0, 0, width, height);
      if (bgLoadedRef.current && bgCanvasRef.current) {
        context.drawImage(bgCanvasRef.current, 0, 0);
      }
      const currentEnemies = enemiesRef.current;
      for (let i = 0; i < currentEnemies.length; i++) {
        const enemy = currentEnemies[i];
        const effectiveSpawnTime = enemy.spawnTime;
        const cycleTime = timestamp - effectiveSpawnTime;
        if (cycleTime < 0) continue;
        const lastKeyframe = enemyPath[enemyPath.length - 1];
        if (cycleTime >= lastKeyframe.time) {
          if (!enemy.hitPlayer) {
            player.hp -= 1;
            enemy.hitPlayer = true;
          }
          continue;
        }
        const { finalX, finalY, opacity } = computeEnemyDrawProps(cycleTime, enemyPath, offsetX, offsetY);
        const adjustedX = finalX + enemy.spriteOffset * offsetMultiplier;
        const adjustedY = finalY;
        context.save();
        context.globalAlpha = opacity;
        let spriteToDraw = null;
        const frames = animatedFramesRef.current[enemy.sprite];
        if (frames && frames.length > 0) {
          const frameDelay = 100;
          const frameIndex = Math.floor(timestamp / frameDelay) % frames.length;
          spriteToDraw = frames[frameIndex];
        } else {
          spriteToDraw = enemyImages[enemy.sprite];
        }
        if (spriteToDraw) {
          const spriteData = enemySprites[enemy.sprite];
          context.drawImage(
            spriteToDraw,
            adjustedX,
            adjustedY,
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
  }, []);

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
