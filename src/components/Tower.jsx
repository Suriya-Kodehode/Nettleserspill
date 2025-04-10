import styles from "../CSSModules/Tower.module.css";

export default function Tower({ top, left }) {
  return (
    <>
      <button
        className={styles.tower}
        style={{ top: `${top}px`, left: `${left}px` }}
      ></button>
    </>
  );
}
