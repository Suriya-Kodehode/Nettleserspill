import React, { useRef, useEffect, useState, useMemo } from "react";
import { preloadStaticSprites, loadAnimatedFrames } from "../GameUtility/spriteLoader.jsx";
import { mapConfigs } from "../GameData/mapConfig.jsx";
import { getEnemyPath } from "../GameUtility/enemyPath.jsx";
import { createBackgroundCanvas } from "../GameUtility/backgroundRenderer.jsx";
import { spawnEnemies } from "../GameComponents/spawnEnemies.jsx";
import { getClickedEnemy, renderEnemiesOnCanvas } from "../GameComponents/Renderer/enemyRender.jsx";
import { renderTowersOnCanvas } from "../GameComponents/Renderer/towerRender.jsx";

const Canvas = ({
  mapName = "newDawn",
  sprites = ["monkey"],
  towers = [],
  style = {},
  offsetMultiplier = 3,
  onEnemyClick,
  onTowerClick,
  selectedEnemy,
  gridCellSize = 16,
  disableCanvasClick = true,
}) => {
  const canvasRef = useRef(null);
  const gameMapRef = useRef(null);
  const bgCanvasRef = useRef(null);
  const spawnTimeoutIdsRef = useRef([]);
  const [enemies, setEnemies] = useState([]);
  const enemiesRef = useRef(enemies);
  const [bgLoaded, setBgLoaded] = useState(false);
  const [assetImages, setAssetImages] = useState({});
  const mapConfig = mapConfigs[mapName];

  const finalSprites = useMemo(() => {
    const spriteSet = new Set([...sprites, "boss"]);
    return [...spriteSet];
  }, [sprites]);

  useEffect(() => {
    (async () => {
      const { images } = await preloadStaticSprites(finalSprites);
      setAssetImages(images);
    })();
  }, [finalSprites]);

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

  const getClickedTower = (x, y) => {
    for (let i = towers.length - 1; i >= 0; i--) {
      const tower = towers[i];
      const cols = tower.gridHighlight?.cols || 2;
      const rows = tower.gridHighlight?.rows || 2;
      const towerWidth = gridCellSize * cols;
      const towerHeight = gridCellSize * rows;
      if (
        x >= tower.left &&
        x <= tower.left + towerWidth &&
        y >= tower.top &&
        y <= tower.top + towerHeight
      ) {
        return tower;
      }
    }
    return null;
  };

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
      
      renderEnemiesOnCanvas(
        context,
        enemiesRef.current,
        enemyPath,
        offsetX,
        offsetY,
        offsetMultiplier,
        timestamp,
        assetImages,
        { current: animatedFramesRef.current },
        selectedEnemy,
        scale
      );

      renderTowersOnCanvas(
        context,
        towers,
        { current: animatedFramesRef.current },
        assetImages,
        gridCellSize,
        timestamp
      );

      animationFrameId = requestAnimationFrame(render);
    };
    animationFrameId = requestAnimationFrame(render);

    const handleCanvasClick = (event) => {
      if (disableCanvasClick) {
        event.stopPropagation();
        return;
      }
      const rect = canvas.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;
      const clickedTower = getClickedTower(clickX, clickY);
      if (clickedTower && onTowerClick) {
        onTowerClick(clickedTower);
        return;
      }
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
      onEnemyClick && onEnemyClick(clickedEnemy || null);
    };
    canvas.addEventListener("click", handleCanvasClick);
    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("click", handleCanvasClick);
    };
  }, [
    finalSprites,
    enemyPath,
    offsetMultiplier,
    onEnemyClick,
    scale,
    towers,
    mapConfig,
    selectedEnemy,
    gridCellSize,
    assetImages,
    disableCanvasClick,
    onTowerClick,
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
      style={style}
    >
      Your browser does not support the HTML5 canvas tag.
    </canvas>
  );
};

export default Canvas;
