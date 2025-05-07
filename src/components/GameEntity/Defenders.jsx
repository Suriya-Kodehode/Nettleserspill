import styles from "../../CSSModules/Defenders.module.css";
import { towerImages } from "../../assets/imageSource";

export function BalloonGunner() {
  return (
    <div className={styles.GunnerPos}>
      <img
        src={towerImages.balloonGunner}
        alt="Balloon Gunner"
        className={styles.Gunner}
      />
    </div>
  );
}

export function BalloonBomber() {
  return (
    <div className={styles.GunnerPos}>
      <img
        src={towerImages.Cannon}
        alt="BalloonCannon"
        className={styles.Bomber}
      />
    </div>
  );
}
