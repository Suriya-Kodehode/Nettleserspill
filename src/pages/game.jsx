
import { useState } from "react";
import Canvas from "../components/gameComponents/Canvas.jsx";
import PlayerStatus, { player } from "../components/UI/PlayerStatus.jsx";
import ToggleGrid from "../components/UI/ToggleGrid.jsx";
import InteractiveGrid from "../components/Functions/InteractiveGrid.jsx";
import styles from "../CSSModules/game.module.css";
import Tower from "../components/Tower.jsx";
import Pause from "../components/Pause.jsx";
import { mapConfigs } from "../components/GameData/mapConfig.jsx";
import { isPlacementAllowed } from "../components/GameData/placementRules.jsx";

function Game() {
  const mapName = "newDawn";
  const spriteName = ["monkey"];

  const [showGrid, setShowGrid] = useState(false);
  const [gridCellSize, setGridCellSize] = useState(16);

  const { width: canvasWidth, height: canvasHeight } = mapConfigs[mapName];

  // handleCellClick now checks the placementRules logic.
  // It uses the isPlacementAllowed helper (which in this version denies positions listed
  // in the restrictPositions object in placementRules.jsx). For now, it logs the result.
  const handleCellClick = ({ col, row }) => {
    if (isPlacementAllowed(mapName, col, row)) {
      console.log(`Allowed placement at (${col}, ${row}).`);
      // You can add logic here to place a tower dynamically if desired.
    } else {
      console.warn(`Placement disallowed at (${col}, ${row}).`);
    }
  };

  return (
    <>
      <div>
        <Pause />
        {/* Original static tower placement remains */}
        <Tower top={420} left={160} />
      </div>
      <div className={styles.gameContainer}>
        <div className={styles.statusContainer}>
          <div className={styles.playerStatus}>
            <PlayerStatus player={player} />
          </div>
        </div>
        <div className={styles.utilityContainer}>
          <ToggleGrid
            showGrid={showGrid}
            onToggle={() => setShowGrid(!showGrid)}
            gridCellSize={gridCellSize}
            onCellSizeChange={setGridCellSize}
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
            <Canvas mapName={mapName} sprites={spriteName} />

            {/* Use InteractiveGrid to capture clicks on the grid */}
            {showGrid && (
              <InteractiveGrid
                width={canvasWidth}
                height={canvasHeight}
                gridCellSize={gridCellSize}
                onCellClick={handleCellClick}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Game;
