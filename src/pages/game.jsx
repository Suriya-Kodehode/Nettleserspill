
import { useState, useRef, useEffect } from "react";
import Canvas from "../components/GameComponents/Canvas.jsx";
import PlayerStatus, { player } from "../components/UI/PlayerStatus.jsx";
import ToggleGrid from "../components/UI/ToggleGrid.jsx";
import InteractiveGrid from "../components/Functions/GridTool/InteractiveGrid.jsx";
import DisallowedOverlay from "../components/Functions/GridTool/DisallowedOverlay.jsx";
import DisallowedButton from "../components/UI/DisallowedButton.jsx";
import styles from "../CSSModules/game.module.css";
import Pause from "../components/UI/Pause.jsx";
import { mapConfigs } from "../components/GameData/mapConfig.jsx";
import {
  enemyRoutes,
  placementRules,
  checkPlacement,
} from "../components/Functions/placementRules.jsx";
import TowerSelection from "../components/UI/TowerSelection.jsx";

function Game() {
  const mapName = "newDawn";
  const enemySprites = ["monkey"];
  const routes = enemyRoutes[mapName] || [];

  const [showGrid, setShowGrid] = useState(false);
  const [showDisallowed, setShowDisallowed] = useState(false);
  const [gridCellSize, setGridCellSize] = useState(16);
  const [selectedEnemy, setSelectedEnemy] = useState(null);
  const [selectedTower, setSelectedTower] = useState(null);
  const [placedTowers, setPlacedTowers] = useState([]);

  const { width: canvasWidth, height: canvasHeight } = mapConfigs[mapName];

  let allRestricted = new Set();
  if (placementRules[mapName]) {
    Object.keys(placementRules[mapName].restrictPositions).forEach((key) => {
      allRestricted.add(key);
    });
  }
  routes.forEach((route) => {
    Object.keys(route.cells).forEach((key) => allRestricted.add(key));
  });
  const restrictedCellsArray = Array.from(allRestricted);

  const towerSelectionRef = useRef(null);

  const handleCellClick = ({ col, row }) => {
    if (selectedTower) {
      const cellKey = `${col}-${row}`;
      if (restrictedCellsArray.includes(cellKey)) {
        console.log("This cell is restricted. Cannot place tower here.");
        return;
      }
      const left = col * gridCellSize;
      const top = row * gridCellSize;
      const newTower = { ...selectedTower, top, left };
      setPlacedTowers((prev) => [...prev, newTower]);
      setSelectedTower(null);
    } else {
      checkPlacement(mapName, col, row);
    }
  };

  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (
        towerSelectionRef.current &&
        !towerSelectionRef.current.contains(e.target)
      ) {
        setSelectedTower(null);
      }
    };
    document.addEventListener("mousedown", handleDocumentClick);
    return () => document.removeEventListener("mousedown", handleDocumentClick);
  }, []);

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
          >
            <Canvas
              mapName={mapName}
              sprites={enemySprites}
              towers={placedTowers}
              onEnemyClick={setSelectedEnemy}
              selectedEnemy={selectedEnemy}
            />
            <InteractiveGrid
              showGrid={showGrid}
              width={canvasWidth}
              height={canvasHeight}
              gridCellSize={gridCellSize}
              onCellClick={handleCellClick}
            />
            {showDisallowed && (
              <DisallowedOverlay
                restrictedCells={restrictedCellsArray}
                gridCellSize={gridCellSize}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Game;
