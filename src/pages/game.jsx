import { useState } from "react";
import Canvas from "../components/gameComponents/Canvas.jsx";
import CanvasGrid from "../components/Functions/CanvasGrid.jsx";
import PlayerStatus, { player } from "../components/UI/PlayerStatus.jsx";
import ToggleGrid from "../components/UI/ToggleGrid.jsx";
import styles from "../CSSModules/game.module.css";
import Tower from "../components/Tower.jsx";
import Pause from "../components/Pause.jsx";
import { mapConfigs } from "../components/GameUtility/mapConfig.jsx";

function Game() {
  const mapName = "newDawn";
  const spriteName = ["monkey"];

  const [showGrid, setShowGrid] = useState(false);
  const [gridCellSize, setGridCellSize] = useState(16);

  const { width: canvasWidth, height: canvasHeight } = mapConfigs[mapName];

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
            {showGrid && (
              <CanvasGrid
                width={canvasWidth}
                height={canvasHeight}
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
