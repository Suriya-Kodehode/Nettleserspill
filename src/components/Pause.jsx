import styles from "../CSSModules/pause.module.css";

function Break() {
  console.log("pause");
}

export default function Pause() {
  return (
    <div className={styles.Bscreen}>
      <button className={styles.pause} onClick={Break}>
        <p>||</p>
      </button>
    </div>
  );
}
