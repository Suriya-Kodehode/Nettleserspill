import React from "react";
import styles from "../../../CSSModules/TowerOptions.module.css";
import { iconImages } from "../../../../src/assets/imageSource.jsx";

const TowerOptions = ({
  activeTower,
  gridCellSize,
  onRelocate,
  onUpgrade,
  moveIconFilter = "",
  upgradeIconFilter = ""
}) => {
  if (!activeTower) return null;

  const cols = activeTower.gridHighlight?.cols || 2;
  const towerWidth = gridCellSize * cols;

  const leftValue = activeTower.left + towerWidth / 1.75;
  const topValue = activeTower.top - 40;

  return (
    <div
      className={styles.container}
      style={{
        "--left": leftValue + "px",
        "--top": topValue + "px"
      }}
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className={styles.relocateButton}
        onClick={(e) => {
          e.stopPropagation();
          onRelocate();
        }}
      >
        <img
          src={iconImages.moveIcon}
          alt="Relocate"
          className={`${styles.icon} ${styles.moveIcon}`}
          style={moveIconFilter ? { "--move-icon-filter": moveIconFilter } : {}}
        />
      </button>
      <button
        className={styles.upgradeButton}
        onClick={(e) => {
          e.stopPropagation();
          onUpgrade();
        }}
      >
        <img
          src={iconImages.upgradeIcon}
          alt="Upgrade"
          className={`${styles.icon} ${styles.upgradeIcon}`}
          style={upgradeIconFilter ? { "--upgrade-icon-filter": upgradeIconFilter } : {}}
        />
      </button>
    </div>
  );
};

export default TowerOptions;