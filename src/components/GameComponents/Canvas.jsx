import { useRef, useEffect, useState, useMemo } from "react";
import { preloadStaticSprites, loadAnimatedFrames } from "../GameUtility/spriteLoader.jsx";
import { mapConfigs } from "../GameData/mapConfig.jsx";
import { getEnemyPath } from "../GameUtility/enemyPath.jsx";
import { createBackgroundCanvas } from "../GameUtility/backgroundRenderer.jsx";
import { spawnEnemies } from "../GameComponents/spawnEnemies.jsx";
import { renderEnemies, getClickedEnemy } from "../GameUtility/enemyRenderer.jsx";
import { enemiesData } from "../GameData/enemyData.jsx";

const Canvas = ({
  mapName = "newDawn",
  sprites = ["monkey"],
  towers = [],
  style = {},
  offsetMultiplier = 3,
  onEnemyClick,
  selectedEnemy,
}) => {
  const canvasRef = useRef(null);
  const gameMapRef = useRef(null);
  const bgCanvasRef = useRef(null);
  const spawnTimeoutIdsRef = useRef([]);
  const [enemies, setEnemies] = useState([]);
  const enemiesRef = useRef(enemies);
  const [bgLoaded, setBgLoaded] = useState(false);
  const mapConfig = mapConfigs[mapName];

  const enemyTypesFromWaves = new Set();
  if (mapConfig && mapConfig.waves) {
    mapConfig.waves.forEach((wave) => {
      if (wave.enemies) {
        Object.keys(wave.enemies).forEach((enemyType) => {
          enemyTypesFromWaves.add(enemyType);
        });
      }
      if (wave.boss && wave.boss.spawn) {
        enemyTypesFromWaves.add("boss");
      }
    });
  }
  const finalSprites = [
    ...new Set([...(sprites || []), ...Array.from(enemyTypesFromWaves)]),
  ];

  const { images: assetImages } = preloadStaticSprites(finalSprites);
  const animatedFramesRef = useRef({});
  useEffect(() => {
    loadAnimatedFrames(finalSprites).then((mapping) => {
      animatedFramesRef.current = mapping;
    });
  }, [finalSprites]);

  useEffect(() => {
    enemiesRef.current = enemies;
  }, [enemies]);

  const bgLoadedRef = useRef(bgLoaded);
  useEffect(() => {
    bgLoadedRef.current = bgLoaded;
  }, [bgLoaded]);

  const enemyPath = useMemo(() => getEnemyPath(mapName), [mapName]);
  const scale = 0.8;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    const { width, height, offsetX, offsetY } = mapConfig;

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
      gameMapRef.current.onerror = () =>
        console.error(`Failed to load map image: ${mapConfig.mapSrc}`);
    }

    let animationFrameId;
    const render = (timestamp) => {
      context.clearRect(0, 0, width, height);
      if (bgLoadedRef.current && bgCanvasRef.current) {
        context.drawImage(bgCanvasRef.current, 0, 0);
      }

      const resolvedAnimated = {};
      finalSprites.forEach((sprite) => {
        if (
          enemiesData[sprite] &&
          enemiesData[sprite].src.toLowerCase().endsWith(".gif")
        ) {
          if (
            animatedFramesRef.current[sprite] &&
            animatedFramesRef.current[sprite].length > 0
          ) {
            resolvedAnimated[sprite] = animatedFramesRef.current[sprite];
          } else {
            const fallback = new Image();
            fallback.src = enemiesData[sprite].src;
            resolvedAnimated[sprite] = [fallback];
          }
        } else if (assetImages[sprite]) {
          resolvedAnimated[sprite] = [assetImages[sprite]];
        } else if (enemiesData[sprite] && enemiesData[sprite].src) {
          const fallback = new Image();
          fallback.src = enemiesData[sprite].src;
          resolvedAnimated[sprite] = [fallback];
        } else {
          console.warn(`Missing asset image for sprite "${sprite}".`);
          resolvedAnimated[sprite] = [];
        }
      });
      const animatedFramesForRenderer = { current: resolvedAnimated };

      renderEnemies(
        context,
        enemiesRef.current,
        enemyPath,
        offsetX,
        offsetY,
        offsetMultiplier,
        timestamp,
        assetImages,
        animatedFramesForRenderer,
        selectedEnemy,
        scale
      );

      if (towers && towers.length > 0) {
        towers.forEach((tower) => {
          const towerFrames =
            resolvedAnimated[tower.sprite] ||
            (assetImages[tower.sprite] ? [assetImages[tower.sprite]] : []);
          if (towerFrames.length > 0) {
            context.drawImage(
              towerFrames[0],
              tower.x,
              tower.y,
              tower.width,
              tower.height
            );
          }
        });
      }
      animationFrameId = requestAnimationFrame(render);
    };
    animationFrameId = requestAnimationFrame(render);

    const handleCanvasClick = (event) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;
      const clickedEnemy = getClickedEnemy(
        clickX,
        clickY,
        enemiesRef.current,
        enemyPath,
        mapConfig.offsetX,
        mapConfig.offsetY,
        offsetMultiplier,
        scale
      );
      if (onEnemyClick) {
        onEnemyClick(clickedEnemy || null);
      }
    };
    canvas.addEventListener("click", handleCanvasClick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("click", handleCanvasClick);
    };
  }, [
    finalSprites,
    assetImages,
    enemyPath,
    offsetMultiplier,
    onEnemyClick,
    scale,
    towers,
    mapConfig,
  ]);

  useEffect(() => {
    const { spawnDelay } = mapConfig;
    const { spawnWave, timeoutIds } = spawnEnemies(mapConfig);
    spawnTimeoutIdsRef.current = timeoutIds;
    const initialTimeout = setTimeout(() => {
      spawnWave(setEnemies);
    }, spawnDelay);
    spawnTimeoutIdsRef.current.push(initialTimeout);

    return () => {
      spawnTimeoutIdsRef.current.forEach((id) => clearTimeout(id));
    };
  }, [mapConfig]);

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
