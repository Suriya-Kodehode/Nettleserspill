
import { useState } from "react";
import Canvas from "../components/GameComponents/Canvas.jsx";
import PlayerStatus, { player } from "../components/UI/PlayerStatus.jsx";
import ToggleGrid from "../components/UI/ToggleGrid.jsx";
import InteractiveGrid from "../components/Functions/InteractiveGrid.jsx";
import DisallowedOverlay from "../components/Functions/DisallowedOverlay.jsx";
import DisallowedButton from "../components/UI/DisallowedButton.jsx";
import styles from "../CSSModules/game.module.css";
import Tower from "../components/Tower.jsx";
import Pause from "../components/Pause.jsx";
import { mapConfigs } from "../components/GameData/mapConfig.jsx";
import { enemyRoutes, placementRules, checkPlacement } from "../components/Functions/placementRules.jsx";

function Game() {
  const mapName = "newDawn";
  const spriteName = ["monkey"];
  const routes = enemyRoutes[mapName] || [];

  const [showGrid, setShowGrid] = useState(false);
  const [showDisallowed, setShowDisallowed] = useState(false);
  const [gridCellSize, setGridCellSize] = useState(16);
  const [selectedEnemy, setSelectedEnemy] = useState(null);

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

  const handleCellClick = ({ col, row }) => {
    checkPlacement(mapName, col, row);
  };

  return (
    <>
      <div>
        <Pause />
        <Tower top={420} left={160} />
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
              sprites={spriteName}
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
