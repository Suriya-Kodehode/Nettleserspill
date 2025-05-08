import { useState, useRef, useEffect } from "react";
import Canvas from "../components/GameComponents/Canvas.jsx";
import PlayerStatus, { player } from "../components/UI/PlayerStatus.jsx";
import ToggleGrid from "../components/UI/ToggleGrid.jsx";
import InteractiveGrid from "../components/Functions/GridTool/InteractiveGrid.jsx";
import DisallowedOverlay from "../components/Functions/GridTool/DisallowedOverlay.jsx";
import DisallowedButton from "../components/UI/DisallowedButton.jsx";
import TowerSelection from "../components/UI/TowerSelection.jsx";
import TowerPreview from "../components/UI/TowerPreview.jsx";
import TowerRangeOverlay from "../components/UI/TowerRangeOverlay.jsx";
import TowerOptions from "../components/UI/TowerOptions.jsx";
import Pause from "../components/UI/Pause.jsx";
import { mapConfigs } from "../components/GameData/mapConfig.jsx";
import { enemyRoutes, placementRules } from "../components/Functions/placementRules.jsx";
import { getRestrictedCells } from "../components/GameUtility/restrictions.jsx";
import { usePreview } from "../components/GameUtility/hooks/usePreview.jsx";
import {
  createHandleCellClick,
  createMapMouseMoveHandler,
  createMapClickHandler,
  handleRelocateOption,
} from "../components/GameUtility/towerInteractionHandlers.jsx";
import styles from "../CSSModules/game.module.css";

function Game() {
  const mapName = "newDawn";
  const sprites = ["monkey", "balloonGunner", "balloonBomber"];
  const routes = enemyRoutes[mapName] || [];

  const [showGrid, setShowGrid] = useState(false);
  const [showDisallowed, setShowDisallowed] = useState(false);
  const [gridCellSize, setGridCellSize] = useState(16);
  const [selectedEnemy, setSelectedEnemy] = useState(null);
  const [selectedTower, setSelectedTower] = useState(null); 
  const [activeTower, setActiveTower] = useState(null); 
  const [placedTowers, setPlacedTowers] = useState([]);
  const [relocatingTower, setRelocatingTower] = useState(null);
  const [relocatePos, setRelocatePos] = useState(null);

  const [previewPos, updatePreview, clearPreview, setPreviewPos] =
    usePreview(selectedTower, gridCellSize);

  const { width: canvasWidth, height: canvasHeight } = mapConfigs[mapName];
  const restrictedCellsArray = getRestrictedCells(mapName, placementRules, routes);
  const towerSelectionRef = useRef(null);

  const getClickedTower = (x, y) => {
    for (let i = placedTowers.length - 1; i >= 0; i--) {
      const tower = placedTowers[i];
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

  const defaultMouseMoveHandler = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const towerUnderMouse = getClickedTower(mouseX, mouseY);
    e.currentTarget.style.cursor = towerUnderMouse ? "pointer" : "default";
  };

  const defaultClickHandler = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const tower = getClickedTower(clickX, clickY);
    if (tower) {
      setActiveTower(tower);
    } else {
      setActiveTower(null);
    }
  };

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

  const handleUpgrade = () => {
    if (!activeTower) return;
    alert(`Upgrading tower ${activeTower.name}!`);
    setActiveTower(null);
  };
  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (
        (towerSelectionRef.current &&
          towerSelectionRef.current.contains(e.target)) ||
        (e.target &&
          e.target.classList &&
          e.target.classList.contains("interactive-grid"))
      ) {
        return;
      }
      setSelectedTower(null);
      setActiveTower(null);
      setRelocatingTower(null);
    };
    document.addEventListener("mousedown", handleDocumentClick);
    return () =>
      document.removeEventListener("mousedown", handleDocumentClick);
  }, []);

  useEffect(() => {
    console.log("Placed Towers:", placedTowers);
  }, [placedTowers]);

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
                  onUpgrade={handleUpgrade}
                  moveIconFilter="invert(1) sepia(1) saturate(10000%) hue-rotate(90deg)"
                  upgradeIconFilter="invert(1) sepia(1) saturate(10000%) hue-rotate(270deg)"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Game;
