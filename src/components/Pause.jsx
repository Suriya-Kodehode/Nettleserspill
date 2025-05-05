import { useState } from "react";
import styles from "../CSSModules/pause.module.css";
import { iconImages } from "../assets/imageSource.jsx";

export default function Pause() {
  const [isPaused, setIsPaused] = useState(true);

  const toggleState = () => {
    if (isPaused) {
      console.log("playing");
    } else {
      console.log("paused");
    }
    setIsPaused(!isPaused);
  };

  return (
    <div className={styles.Bscreen}>
      <button className={styles.pause} onClick={toggleState}>
        {isPaused ? (
          <p>||</p>
        ) : (
          <img src={iconImages.playButton} alt="Play button" />
        )}
      </button>
    </div>
  );
}
