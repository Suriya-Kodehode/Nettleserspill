import { useState } from "react";
import styles from "../CSSModules/Tower.module.css";

export default function Tower({ top, left }) {
  // State to manage visibility of the <p> tags
  const [isVisible, setIsVisible] = useState(false);

  // Function to toggle visibility
  function selector() {
    setIsVisible((prevState) => !prevState);
  }

  return (
    <button
      onClick={selector}
      className={styles.tower}
      style={{ top: `${top}px`, left: `${left}px` }}
    >
      {/* Conditionally render <p> tags based on isVisible state */}
      {isVisible && <p className={styles.Tower1}>Tower1</p>}
      {isVisible && <p className={styles.Tower2}>Tower2</p>}
      {isVisible && <p className={styles.Tower3}>Tower3</p>}
    </button>
  );
}
