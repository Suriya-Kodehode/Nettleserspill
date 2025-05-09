import { useState, useRef, useEffect } from "react";
import Canvas from "../components/GameComponents/Canvas.jsx";
import PlayerStatus, { player } from "../components/UI/PlayerStatus.jsx";
import ToggleGrid from "../components/UI/ToggleGrid.jsx";
import InteractiveGrid from "../components/Functions/GridTool/InteractiveGrid.jsx";
import DisallowedOverlay from "../components/Functions/GridTool/DisallowedOverlay.jsx";
import DisallowedButton from "../components/UI/DisallowedButton.jsx";
import TowerSelection from "../components/UI/Tower/TowerSelection.jsx";
import TowerPreview from "../components/UI/Tower/TowerPreview.jsx";
import TowerRangeOverlay from "../components/UI/Tower/TowerRangeOverlay.jsx";
import TowerOptions from "../components/UI/Tower/TowerOptions.jsx";
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
  handleRelocateOption,
  handleUpgrade,
} from "../components/GameUtility/Handlers/towerInteractionHandlers.jsx";
import { createDefaultMouseMoveHandler, createDefaultClickHandler } from "../components/GameUtility/Handlers/defaultHandlers.jsx";
import { createDocumentClickHandler, handleRestart as generalHandleRestart } from "../components/GameUtility/Handlers/generalHandlers.jsx";
import styles from "../CSSModules/game.module.css";

function Game() {
  const mapName = "newDawn";
  const sprites = ["monkey", "balloonGunner", "balloonBomber"];
  const routes = enemyRoutes[mapName] || [];

  const [gameResetKey, setGameResetKey] = useState(Date.now());

  const [showGrid, setShowGrid] = useState(false);
  const [showDisallowed, setShowDisallowed] = useState(false);
  const [gridCellSize, setGridCellSize] = useState(16);
  const [selectedEnemy, setSelectedEnemy] = useState(null);
  const [selectedTower, setSelectedTower] = useState(null);
  const [activeTower, setActiveTower] = useState(null);
  const [placedTowers, setPlacedTowers] = useState([]);
  const [relocatingTower, setRelocatingTower] = useState(null);
  const [relocatePos, setRelocatePos] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [previewPos, updatePreview, clearPreview, setPreviewPos] =
    usePreview(selectedTower, gridCellSize);

  const { width: canvasWidth, height: canvasHeight } = mapConfigs[mapName];
  const restrictedCellsArray = getRestrictedCells(mapName, placementRules, routes);
  const towerSelectionRef = useRef(null);

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
    setRelocatePos,
    defaultMouseMoveHandler
  );

  const mapClickHandler = createMapClickHandler(
    relocatingTower,
    gridCellSize,
    setPlacedTowers,
    setRelocatingTower,
    setRelocatePos,
    restrictedCellsArray,
    defaultClickHandler
  );

  const onRelocateOption = () => {
    handleRelocateOption(activeTower, setPlacedTowers, setActiveTower, setRelocatingTower);
  };

  useEffect(() => {
    const docClickHandler = createDocumentClickHandler(
      towerSelectionRef,
      setSelectedTower,
      setActiveTower,
      setRelocatingTower
    );
    document.addEventListener("mousedown", docClickHandler);
    return () => document.removeEventListener("mousedown", docClickHandler);
  }, []);

  useEffect(() => {
    console.log("Placed Towers:", placedTowers);
  }, [placedTowers]);

  useEffect(() => {
    const handleGameOver = (e) => {
      if (e.detail.gameOver) {
        setGameOver(true);
      }
    };
    window.addEventListener("gameOver", handleGameOver);
    return () => window.removeEventListener("gameOver", handleGameOver);
  }, []);

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

  return (
    <>
      <div>
        <Pause />
      </div>
      <div className={styles.gameContainer}>
        <div className={styles.statusContainer}>
          <div className={styles.playerStatus}>
            <PlayerStatus player={player} />
          </div>
          <div className={styles.enemyDetails}>
            {selectedEnemy ? (
              <div>
                <h3>
                  {(selectedEnemy.name || selectedEnemy.sprite)
                    .charAt(0)
                    .toUpperCase() +
                    (selectedEnemy.name || selectedEnemy.sprite).slice(1)}
                </h3>
                <p>HP: {selectedEnemy.hp}</p>
              </div>
            ) : (
              <p>Select an enemy to see its details</p>
            )}
          </div>
        </div>
        <div className={styles.utilityContainer}>
          <ToggleGrid
            showGrid={showGrid}
            onToggle={() => setShowGrid(!showGrid)}
            gridCellSize={gridCellSize}
            onCellSizeChange={setGridCellSize}
          />
          <DisallowedButton
            showDisallowed={showDisallowed}
            toggleShowDisallowed={() => setShowDisallowed(!showDisallowed)}
          />
          <TowerSelection
            ref={towerSelectionRef}
            selectedTower={selectedTower}
            onTowerSelect={setSelectedTower}
          />
        </div>
        <div className={styles.mapContainer}>
          <div
            style={{
              position: "relative",
              width: canvasWidth,
              height: canvasHeight,
            }}
            onMouseMove={(e) => {
              if (selectedTower) {
                updatePreview(e);
              } else {
                mapMouseMoveHandler(e);
              }
            }}
            onMouseLeave={() => {
              clearPreview();
              document.body.style.cursor = "default";
            }}
            onClick={mapClickHandler}
          >
            <Canvas
              key={gameResetKey}
              mapName={mapName}
              sprites={sprites}
              towers={placedTowers}
              onEnemyClick={setSelectedEnemy}
              onTowerClick={(tower) => {
                console.log("Placed tower clicked via Canvas:", tower);
                setActiveTower(tower);
              }}
              selectedEnemy={selectedEnemy}
              gridCellSize={gridCellSize}
              disableCanvasClick={selectedTower ? true : false}
            />
            <InteractiveGrid
              showGrid={showGrid}
              width={canvasWidth}
              height={canvasHeight}
              gridCellSize={gridCellSize}
              onCellClick={handleCellClick}
              style={{ pointerEvents: selectedTower ? "auto" : "none" }}
            />
            {showDisallowed && (
              <DisallowedOverlay
                restrictedCells={restrictedCellsArray}
                gridCellSize={gridCellSize}
              />
            )}
            {selectedTower && previewPos && (
              <TowerPreview
                previewPos={previewPos}
                gridCellSize={gridCellSize}
                selectedTower={selectedTower}
                restrictedCellsArray={restrictedCellsArray}
              />
            )}
            {relocatingTower && relocatePos && (
              <TowerPreview
                previewPos={relocatePos}
                gridCellSize={gridCellSize}
                selectedTower={relocatingTower}
                restrictedCellsArray={restrictedCellsArray}
              />
            )}
            {activeTower && !relocatingTower && (
              <>
                <TowerRangeOverlay
                  activeTower={activeTower}
                  gridCellSize={gridCellSize}
                />
                <TowerOptions
                  activeTower={activeTower}
                  gridCellSize={gridCellSize}
                  onRelocate={onRelocateOption}
                  onUpgrade={() => handleUpgrade(activeTower, setActiveTower)}
                  moveIconFilter="invert(1) sepia(1) saturate(10000%) hue-rotate(90deg)"
                  upgradeIconFilter="invert(1) sepia(1) saturate(10000%) hue-rotate(270deg)"
                />
              </>
            )}
          </div>
        </div>
      </div>
      {gameOver && <GameOverScreen onRestart={restartHandler} />}
    </>
  );
}

export default Game;
