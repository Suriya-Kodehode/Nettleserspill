import styles from "../CSSModules/Defenders.module.css";
import { towerImages } from "../assets/imageSource.jsx";

export default function BalloonGunner() {
  return (
    <div className={styles.gunner}>
      <img src={towerImages.balloonGunner} alt="Balloon Gunner" />
    </div>
  );
}
