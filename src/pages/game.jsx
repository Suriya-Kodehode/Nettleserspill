import { useState } from 'react';
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
        <Tower top={350} left={100} />
//         <Tower top={400} left={260} />
//         <Tower top={500} left={260} />
//         <Tower top={255} left={385} />
//         <Tower top={120} left={570} />
//         <Tower top={200} left={570} />
//         <Tower top={490} left={690} />
//         <Tower top={430} left={690} />
//         <Tower top={490} left={770} />
//         <Tower top={470} left={1220} />
//         <Tower top={470} left={1120} />
//         <Tower top={150} left={1120} />
//         <Tower top={150} left={1220} />
//         <Tower top={100} left={800} />
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
            <div style={{ position: "relative", width: canvasWidth, height: canvasHeight }}>
              <Canvas 
                mapName={mapName} 
                sprites={spriteName}
              
              />
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
