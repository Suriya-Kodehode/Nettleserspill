
import React from "react";

const TowerRangeOverlay = ({ activeTower, gridCellSize }) => {
  if (!activeTower || !activeTower.range) return null;

  const cols = activeTower.gridHighlight?.cols || 2;
  const rows = activeTower.gridHighlight?.rows || 2;
  const towerWidth = gridCellSize * cols;
  const towerHeight = gridCellSize * rows;
  
  const centerX = activeTower.left + towerWidth / 2;
  const centerY = activeTower.top + towerHeight / 2;
  
  const diameter = activeTower.range * 2;

  const style = {
    position: "absolute",
    left: centerX - activeTower.range,
    top: centerY - activeTower.range,
    width: diameter,
    height: diameter,
    backgroundColor: "rgba(255, 255, 0, 0.2)",
    borderRadius: "50%",
    pointerEvents: "none",
    boxSizing: "border-box",
  };

  return <div style={style}></div>;
};

export default TowerRangeOverlay;
