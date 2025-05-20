import React, { useRef, useEffect, useState, useMemo } from "react";
import { mapConfigs } from "../GameData/mapConfig.jsx";
import { getEnemyPath } from "../GameUtility/enemyPath.jsx";
import { createBackgroundCanvas } from "../GameUtility/backgroundRenderer.jsx";
import { spawnEnemies } from "../GameComponents/spawnEnemies.jsx";
import { renderEnemiesOnCanvas } from "../GameComponents/Renderer/enemyRender.jsx";
import { renderTowersOnCanvas } from "../GameComponents/Renderer/towerRender.jsx";
import { useSprites } from "../GameUtility/hooks/useSprites.jsx";
import useCanvasAnimation from "../GameUtility/hooks/useCanvasAnimation.jsx";
import { getClickedTower } from "../GameUtility/helpers/towerHelpers.jsx";
import { getClickedEnemy } from "../GameComponents/Renderer/enemyRender.jsx";

const Canvas = ({
  gameResetKey,
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
  isRelocating = false,
}) => {
  const canvasRef = useRef(null);
  const bgCanvasRef = useRef(null);
  const spawnTimeoutIdsRef = useRef([]);
  const [enemies, setEnemies] = useState([]);
  const [bgLoaded, setBgLoaded] = useState(false);
  const mapConfig = mapConfigs[mapName];

  const finalSprites = useMemo(() => [...new Set([...sprites, "boss"])], [sprites]);
  const { assetImages, animatedFrames } = useSprites(finalSprites);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { width, height } = mapConfig;
    const img = new Image();
    img.src = mapConfig.mapSrc;
    if (img.complete) {
      bgCanvasRef.current = createBackgroundCanvas(img, width, height);
      setBgLoaded(true);
    } else {
      img.onload = () => {
        bgCanvasRef.current = createBackgroundCanvas(img, width, height);
        setBgLoaded(true);
      };
      img.onerror = () => console.error(`Failed to load map image: ${mapConfig.mapSrc}`);
    }
  }, [mapConfig]);

  const enemyPath = useMemo(() => getEnemyPath(mapName), [mapName]);
  const scale = 0.8;

  const renderCanvas = (ctx, timestamp) => {
    const { width, height, offsetX, offsetY } = mapConfig;
    ctx.clearRect(0, 0, width, height);
    if (bgLoaded && bgCanvasRef.current) ctx.drawImage(bgCanvasRef.current, 0, 0);
    renderEnemiesOnCanvas(
      ctx,
      enemies,
      enemyPath,
      offsetX,
      offsetY,
      offsetMultiplier,
      timestamp,
      assetImages,
      animatedFrames,
      selectedEnemy,
      scale
    );
    renderTowersOnCanvas(ctx, towers, animatedFrames, assetImages, gridCellSize, timestamp);
  };

  useCanvasAnimation(
    canvasRef,
    renderCanvas,
    [bgLoaded, assetImages, animatedFrames, enemyPath, offsetMultiplier, scale, towers, selectedEnemy, gridCellSize, mapConfig]
  );

  useEffect(() => {
    const { spawnDelay } = mapConfig;
    setEnemies([]);
    const { spawnWave, timeoutIds } = spawnEnemies(mapConfig);
    spawnTimeoutIdsRef.current = timeoutIds;
    const initialTimeout = setTimeout(() => spawnWave(setEnemies), spawnDelay);
    spawnTimeoutIdsRef.current.push(initialTimeout);
    return () => spawnTimeoutIdsRef.current.forEach((id) => clearTimeout(id));
  }, [mapConfig, gameResetKey]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const handleCanvasClick = (event) => {
      if (disableCanvasClick) {
        event.stopPropagation();
        return;
      }
      if (isRelocating) return;
      const rect = canvas.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;
      const tower = getClickedTower(clickX, clickY, towers, gridCellSize);
      if (tower && onTowerClick) {
        onTowerClick(tower, event);
        return;
      }
      const enemy = getClickedEnemy(
        clickX,
        clickY,
        enemies,
        enemyPath,
        mapConfig.offsetX,
        mapConfig.offsetY,
        offsetMultiplier,
        scale
      );
      if (onEnemyClick) onEnemyClick(enemy || null);
    };
    canvas.addEventListener("click", handleCanvasClick);
    return () => canvas.removeEventListener("click", handleCanvasClick);
  }, [disableCanvasClick, isRelocating, towers, gridCellSize, onTowerClick, onEnemyClick, enemyPath, mapConfig, offsetMultiplier, scale]);

  const canvasStyle = {
    ...style,
    pointerEvents: isRelocating ? "none" : style.pointerEvents || "auto",
  };

  return (
    <canvas
      ref={canvasRef}
      width={mapConfig.width}
      height={mapConfig.height}
      style={canvasStyle}
    >
      Your browser does not support the HTML5 canvas tag.
    </canvas>
  );
};

export default Canvas;