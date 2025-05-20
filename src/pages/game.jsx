import { useState, useRef, useEffect } from "react";
import StatusPanel from "../components/UI/StatusPanel.jsx";
import ControlPanel from "../components/UI/ControlPanel.jsx";
import GameMap from "../components/GameComponents/GameMap.jsx";
import Pause from "../components/UI/Pause.jsx";
import GameOverScreen from "../components/UI/GameOverScreen.jsx";
import { mapConfigs } from "../components/GameData/mapConfig.jsx";
import { enemyRoutes, placementRules } from "../components/Functions/placementRules.jsx";
import { getRestrictedCells } from "../components/GameUtility/restrictions.jsx";
import { usePreview } from "../components/GameUtility/hooks/usePreview.jsx";
import {
  createHandleCellClick,
  createMapMouseMoveHandler,
  createMapClickHandler,
  handleRelocateStart,
  cancelRelocation,
} from "../components/GameUtility/Handlers/towerInteractionHandlers.jsx";
import { createDefaultMouseMoveHandler, createDefaultClickHandler } from "../components/GameUtility/Handlers/defaultHandlers.jsx";
import { handleRestart as generalHandleRestart } from "../components/GameUtility/Handlers/generalHandlers.jsx";
import useDocumentClickHandler from "../components/GameUtility/hooks/useDocumentClickHandler.jsx";
import useGameOverListener from "../components/GameUtility/hooks/useGameOverListener.jsx";
import useLogPlacedTowers from "../components/GameUtility/hooks/useLogPlacedTowers.jsx";
import { player } from "../components/UI/PlayerStatus.jsx";
import styles from "../CSSModules/game.module.css";

function Game() {
  const mapName = "newDawn";
  const sprites = ["monkey", "balloonGunner", "balloonBomber"];
  const routes = enemyRoutes[mapName] || [];
  const { width: canvasWidth, height: canvasHeight } = mapConfigs[mapName];

  const [gameResetKey, setGameResetKey] = useState(Date.now());
  const [showGrid, setShowGrid] = useState(false);
  const [showDisallowed, setShowDisallowed] = useState(false);
  const [gridCellSize, setGridCellSize] = useState(16);
  const [selectedEnemy, setSelectedEnemy] = useState(null);
  const [selectedTower, setSelectedTower] = useState(null);
  const [activeTower, setActiveTower] = useState(null);
  const [placedTowers, setPlacedTowers] = useState([]);
  const [relocatingTower, setRelocatingTower] = useState(null);
  const [ghostRelocatePos, setGhostRelocatePos] = useState(null);
  const [isRelocateLocked, setIsRelocateLocked] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const [previewPos, updatePreview, clearPreview, setPreviewPos] =
    usePreview(selectedTower, gridCellSize);

  const restrictedCellsArray = getRestrictedCells(mapName, placementRules, routes);
  const towerSelectionRef = useRef(null);
  const gameContainerRef = useRef(null);

  const defaultMouseMoveHandler = createDefaultMouseMoveHandler(placedTowers, gridCellSize);
  const defaultClickHandler = createDefaultClickHandler(placedTowers, gridCellSize, setActiveTower);

  const handleCellClick = createHandleCellClick(
    selectedTower,
    previewPos,
    gridCellSize,
    restrictedCellsArray,
    setPlacedTowers,
    setSelectedTower,
    setPreviewPos
  );

  const mapMouseMoveHandler = createMapMouseMoveHandler(
    relocatingTower,
    gridCellSize,
    setGhostRelocatePos,
    defaultMouseMoveHandler,
    isRelocateLocked
  );

  const mapClickHandler = createMapClickHandler(relocatingTower, defaultClickHandler);

  const onRelocateOption = () => {
    if (activeTower) {
      handleRelocateStart(activeTower, setRelocatingTower);
      setGhostRelocatePos({ left: activeTower.left, top: activeTower.top });
      setIsRelocateLocked(false);
      console.log("Relocate activated; ghost preview started.");
    }
  };

  const onUpgradeOption = () => {
    console.log("Upgrade button clicked for tower:", activeTower);
    setActiveTower(null);
  };

  const cancelRelocationHandler = () => {
    cancelRelocation(setRelocatingTower, setGhostRelocatePos);
    setIsRelocateLocked(false);
  };

  useDocumentClickHandler(
    towerSelectionRef,
    setSelectedTower,
    setActiveTower,
    setRelocatingTower
  );
  useLogPlacedTowers(placedTowers);
  useGameOverListener(setGameOver);

  const restartHandler = () => {
    generalHandleRestart({
      setGameOver,
      setPlacedTowers,
      setSelectedTower,
      setActiveTower,
      setRelocatingTower,
      setPreviewPos,
      player,
      initialPlayerHP: 100,
    });
    setGameResetKey(Date.now());
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest(".relocation-overlay")) return;
      if (
        relocatingTower &&
        gameContainerRef.current &&
        !gameContainerRef.current.contains(event.target)
      )
        cancelRelocationHandler();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [relocatingTower]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && relocatingTower) cancelRelocationHandler();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [relocatingTower]);

  return (
    <>
      <div>
        <Pause />
      </div>
      <div className={styles.gameContainer} ref={gameContainerRef}>
        <StatusPanel player={player} selectedEnemy={selectedEnemy} />
        <ControlPanel
          showGrid={showGrid}
          onToggleGrid={() => setShowGrid(!showGrid)}
          gridCellSize={gridCellSize}
          onCellSizeChange={setGridCellSize}
          showDisallowed={showDisallowed}
          toggleShowDisallowed={() => setShowDisallowed(!showDisallowed)}
          towerSelectionRef={towerSelectionRef}
          selectedTower={selectedTower}
          onTowerSelect={setSelectedTower}
        />
        <div className={styles.mapContainer}>
          <GameMap
            gameResetKey={gameResetKey}
            canvasWidth={canvasWidth}
            canvasHeight={canvasHeight}
            mapName={mapName}
            sprites={sprites}
            placedTowers={placedTowers}
            selectedEnemy={selectedEnemy}
            onEnemyClick={setSelectedEnemy}
            onTowerClick={(tower, e) => {
              console.log("Placed tower clicked:", tower);
              if (e) e.stopPropagation();
              setActiveTower(tower);
            }}
            gridCellSize={gridCellSize}
            selectedTower={selectedTower}
            previewPos={previewPos}
            relocatingTower={relocatingTower}
            relocatePos={ghostRelocatePos}
            handleCellClick={handleCellClick}
            mapMouseMoveHandler={mapMouseMoveHandler}
            mapClickHandler={mapClickHandler}
            restrictedCellsArray={getRestrictedCells(mapName, placementRules, routes)}
            activeTower={activeTower}
            onRelocate={onRelocateOption}
            onUpgrade={onUpgradeOption}
            showDisallowed={showDisallowed}
            showGrid={showGrid}
            updatePreview={updatePreview}
            clearPreview={clearPreview}
            setSelectedTower={setSelectedTower}
            setPreviewPos={setPreviewPos}
            setRelocatingTower={setRelocatingTower}
            setGhostRelocatePos={setGhostRelocatePos}
            setPlacedTowers={setPlacedTowers}
            isRelocateLocked={isRelocateLocked}
            setIsRelocateLocked={setIsRelocateLocked}
          />
        </div>
      </div>
      {gameOver && <GameOverScreen onRestart={restartHandler} />}
    </>
  );
}

export default Game;