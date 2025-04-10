import styles from "../CSSModules/pause.module.css";

export default function Pause() {
  return (
    <button className={styles.pause}>
      <p>||</p>
    </button>
  );
}
