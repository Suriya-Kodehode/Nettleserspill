import styles from "../CSSModules/game.module.css";
import Tower from "../components/Tower.jsx";
import Pause from "../components/Pause.jsx";

function Game() {
  return (
    <>
      <div className={styles.mapContainer}>
        <Pause />
        <Tower top={350} left={100} />
        <Tower top={400} left={260} />
        <Tower top={500} left={260} />
        <Tower top={255} left={385} />
        <Tower top={120} left={570} />
        <Tower top={200} left={570} />
        <Tower top={490} left={690} />
        <Tower top={430} left={690} />
        <Tower top={490} left={770} />
        <Tower top={470} left={1220} />
        <Tower top={470} left={1120} />
        <Tower top={150} left={1120} />
        <Tower top={150} left={1220} />
        <Tower top={100} left={800} />
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
