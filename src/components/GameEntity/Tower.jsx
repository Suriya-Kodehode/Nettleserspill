import React, { useState } from "react";
import styles from "../../CSSModules/Tower.module.css";
import TowerSelection from "../UI/TowerSelection.jsx";

export default function Tower({ top, left }) {
  const [showSelection, setShowSelection] = useState(false);
  const [activeTower, setActiveTower] = useState(null);

  const toggleSelection = (e) => {
    e.stopPropagation();
    setShowSelection((prev) => !prev);
  };

  const handleTowerSelect = (tower) => {
    setActiveTower(tower);
    setShowSelection(false);
  };

  const TowerComponent = activeTower ? activeTower.component : null;

  return (
    <div
      className={styles.tower}
      style={{ top: `${top}px`, left: `${left}px` }}
      onClick={toggleSelection}
    >
      {showSelection && (
        <TowerSelection
          selectedTower={activeTower}
          onTowerSelect={handleTowerSelect}
        />
      )}

      {activeTower && TowerComponent && (
        <div className={styles.towerPlaced}>
          <TowerComponent />
        </div>
      )}
    </div>
  );
}
