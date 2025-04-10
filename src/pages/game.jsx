import Canvas from "../components/gameComponents/Canvas";
import styles from "../CSSModules/game.module.css";

function Game() {
  const mapName = "newDawn";
  const spriteName = ["monkey"];

  return (
    <>
      <div className={styles.mapContainer}>
        <Canvas mapName={mapName} sprites={spriteName}/>
      </div>
    </>
  );
}

export default Game;
