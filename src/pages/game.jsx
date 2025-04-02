import styles from "../CSSModules/game.module.css";

function Game() {
  return (
    <>
      <div>
        <div className={styles.mapContainer}>
          <img src="/images/maps/map.png" alt="" className={styles.map} />
        </div>
      </div>
    </>
  );
}

export default Game;
