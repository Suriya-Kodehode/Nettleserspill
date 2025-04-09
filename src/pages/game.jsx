import styles from "../CSSModules/game.module.css";

function Game() {
  return (
    <>
      <div className={styles.mapContainer}>
        <img src="/images/maps/New Dawn.png" alt="" className={styles.map} />
        <img
          src="/images/enemy/MonkeySprite.png"
          alt="enemy"
          className={styles.enemy}
        />
      </div>
    </>
  );
}

export default Game;
