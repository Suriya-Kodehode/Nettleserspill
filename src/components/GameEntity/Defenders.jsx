import styles from "../../CSSModules/Defenders.module.css";

export function BalloonGunner() {
  return (
    <div className={styles.GunnerPos}>
      <img
        src="/public/images/tower/BalloonGunner.gif"
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
        src="/public/images/tower/Cannon.gif"
        alt="BalloonCannon"
        className={styles.Bomber}
      />
    </div>
  );
}
