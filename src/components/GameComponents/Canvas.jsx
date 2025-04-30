
import { useRef, useEffect, useState, useMemo } from "react";
import { preloadStaticSprites, loadAnimatedFrames } from "../GameUtility/spriteLoader.jsx";
import { mapConfigs } from "../GameData/mapConfig.jsx";
import { getEnemyPath } from "../GameUtility/enemyPath.jsx";
import { createBackgroundCanvas } from "../GameUtility/backgroundRenderer.jsx";
import { spawnEnemies } from "../GameComponents/spawnEnemies.jsx";
import { renderEnemies, getClickedEnemy } from "../GameUtility/enemyRenderer.jsx";

const Canvas = ({
  mapName = "newDawn",
  sprites = ["monkey"],
  style = {},
  offsetMultiplier = 3,
  onEnemyClick,
  selectedEnemy,  
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

  const scale = 0.8;

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
      gameMapRef.current.onerror = () =>
        console.error(`Failed to load map image: ${mapConfig.mapSrc}`);
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
      renderEnemies(
        context,
        enemiesRef.current,
        enemyPath,
        offsetX,
        offsetY,
        offsetMultiplier,
        timestamp,
        enemyImages,
        animatedFramesRef,
        selectedEnemy, 
        scale 
      );
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
        offsetX,
        offsetY,
        offsetMultiplier,
        scale 
      );
  
      if (onEnemyClick) {
        onEnemyClick(clickedEnemy || null);
      }
    };
    canvas.addEventListener("click", handleCanvasClick);

    return () => {
      timeoutIdsRef.current.forEach(clearTimeout);
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("click", handleCanvasClick);
    };
  }, [selectedEnemy]);

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
