import React from "react";
import { towerData } from "../../GameData/towerData.jsx";
import StaticImage from "../../Functions/StaticImage.jsx"; 
import styles from "../../../CSSModules/game.module.css";

const TowerSelection = React.forwardRef(({ selectedTower, onTowerSelect }, ref) => {
  const selectableTowers = Object.values(towerData).filter(
    (tower) => !tower.id.endsWith("u")
  );

  return (
    <div ref={ref} className={styles.towerSelection}>
      {selectableTowers.map((tower) => (
        <button
          key={tower.id}
          className={`${styles.towerSelectionButton} ${
            selectedTower?.id === tower.id ? styles.selectedTower : ""
          }`}
          onClick={() => onTowerSelect(tower)}
        >
          <StaticImage
            src={tower.src}
            alt={tower.name}
            className={styles.towerImage}
            freeze={true}
          />
          <div className={styles.towerName}>{tower.name}</div>
        </button>
      ))}
    </div>
  );
});

export default TowerSelection;
