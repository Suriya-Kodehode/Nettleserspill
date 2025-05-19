import React from "react";
import ToggleGrid from "./ToggleGrid.jsx";
import DisallowedButton from "./DisallowedButton.jsx";
import TowerSelection from "./Tower/TowerSelection.jsx";
import styles from "../../CSSModules/game.module.css";

const ControlPanel = ({
  showGrid,
  onToggleGrid,
  gridCellSize,
  onCellSizeChange,
  showDisallowed,
  toggleShowDisallowed,
  towerSelectionRef,
  selectedTower,
  onTowerSelect,
}) => {
  return (
    <div className={styles.utilityContainer}>
      <ToggleGrid
        showGrid={showGrid}
        onToggle={onToggleGrid}
        gridCellSize={gridCellSize}
        onCellSizeChange={onCellSizeChange}
      />
      <DisallowedButton
        showDisallowed={showDisallowed}
        toggleShowDisallowed={toggleShowDisallowed}
      />
      <TowerSelection
        ref={towerSelectionRef}
        selectedTower={selectedTower}
        onTowerSelect={onTowerSelect}
      />
    </div>
  );
};

export default ControlPanel;