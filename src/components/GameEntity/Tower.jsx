import { useState } from "react";
import styles from "../../CSSModules/Tower.module.css";
import { BalloonGunner, BalloonBomber } from "./Defenders.jsx";
// import { generateEnemy } from "../GameComponents/generateEnemies.jsx";
// import { renderEnemies } from "../GameUtility/enemyRenderer.jsx";

export default function Tower({ top, left }) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTower, setActiveTower] = useState(null);

  function selector() {
    checkCollision;
    // const enemies = generateEnemy();
    // enemies.forEach((enemy) => {
    // console.log(`Enemy ${enemy.id} hitbox position:`, enemy.hitbox);
    // });
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

  function checkCollision() {
    const tower = document
      .getElementsByClassName("styles.GunnerPos")
      .getBoundingClientRect();
    const enemy = document
      .getElementsByTagName("enemy.id")
      .getBoundingClientRect();

    const isInRadius = !(
      enemy.right < tower.left ||
      enemy.left > tower.right ||
      enemy.bottom < tower.top ||
      enemy.top > tower.bottom
    );

    if (isInRadius) {
      console.log("Enemy is within tower radius! Fire!");
      // Your function here, e.g. tower.fireAt(enemy)
    }
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
