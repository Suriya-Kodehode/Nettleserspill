import { useState } from "react";
import styles from "../../CSSModules/Tower.module.css";
import { BalloonGunner, BalloonBomber } from "./Defenders.jsx";
import { generateEnemiesForMap } from "../GameComponents/generateEnemies.jsx";
import { enemySprites } from "../GameUtility/enemySprites.jsx";
// import { preloadStaticSprites } from "../GameUtility/spriteLoader.jsx";
// import { getDefaultEnemyProperties } from "../GameUtility/enemyDefaults.jsx";
// import { spawnEnemies } from "../GameComponents/spawnEnemies.jsx";
// import { mapConfigs } from "../GameUtility/mapConfig.jsx";
// import { computeEnemyDrawProps } from "../GameUtility/computeEnemyProps.jsx";
// import { getEnemyPath } from "../GameUtility/enemyPath.jsx";
// import { wavesForNewDawn } from "../GameUtility/waveConfig.jsx";
// import { computeEnemyDrawProps } from "../GameComponents/Canvas.jsx";
// import { Canvas } from "../GameComponents/Canvas.jsx";

export default function Tower({ top, left }) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTower, setActiveTower] = useState(null);

  function selector() {
    // console.log(left);
    // console.log(top);

    const enemies = generateEnemiesForMap("newDawn", enemySprites);
    enemies.forEach((enemy) => {
      console.log(`Enemy ${enemy.id} hitbox position:`, enemy.hitbox);
      // console.log("ENEMIES ARRAY:", enemies);
      console.log("TYPE:", Array.isArray(enemies));
    });

    // console.log(getDefaultEnemyProperties("monkey").hitbox.y);
    // console.log(enemySprites.monkey.defaultHitbox.x);
    // console.log(enemySprites.monkey.defaultHitbox.y);
    // console.log(computeEnemyDrawProps.finalX);
    // console.log(computeEnemyDrawProps.finalY);
    // console.log(getEnemyPath.time);
    setIsVisible((prevState) => !prevState);
  }

  function T1() {
    setActiveTower("T1");
  }

  function T2() {
    setActiveTower("T2");
  }

  function T3() {
    setActiveTower("T3");
  }

  return (
    <button
      onClick={selector}
      className={styles.tower}
      style={{ top: `${top}px`, left: `${left}px` }}
    >
      {isVisible && (
        <>
          <p onClick={T1} className={styles.Tower1}></p>
          <p onClick={T2} className={styles.Tower2}></p>
          <p onClick={T3} className={styles.Tower3}></p>
        </>
      )}
      {activeTower === "T1" && <BalloonGunner />}
      {activeTower === "T2" && <BalloonBomber />}
      {activeTower === "T3" && <BalloonGunner />}
    </button>
  );
}
