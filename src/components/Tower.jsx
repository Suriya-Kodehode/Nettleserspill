import { useState } from "react";
import styles from "../CSSModules/Tower.module.css";

export default function Tower({ top, left }) {
  const [isVisible, setIsVisible] = useState(false);

  function selector() {
    setIsVisible((prevState) => !prevState);
  }

  function T1() {
    console.log("BalloonGunner");
  }

  function T2() {
    console.log("Tower 2");
  }

  function T3() {
    console.log("Tower 3");
  }

  return (
    <button
      onClick={selector}
      className={styles.tower}
      style={{ top: `${top}px`, left: `${left}px` }}
    >
      {isVisible && <p onClick={T1} className={styles.Tower1}></p>}
      {isVisible && <p onClick={T2} className={styles.Tower2}></p>}
      {isVisible && <p onClick={T3} className={styles.Tower3}></p>}
    </button>
  );
}
