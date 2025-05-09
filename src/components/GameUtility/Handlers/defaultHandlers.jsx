
import { getClickedTower } from "./towerInteractionHandlers.jsx";

export const createDefaultMouseMoveHandler = (placedTowers, gridCellSize) => {
  return (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const towerUnderMouse = getClickedTower(mouseX, mouseY, placedTowers, gridCellSize);
    e.currentTarget.style.cursor = towerUnderMouse ? "pointer" : "default";
  };
};

export const createDefaultClickHandler = (placedTowers, gridCellSize, setActiveTower) => {
  return (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const tower = getClickedTower(clickX, clickY, placedTowers, gridCellSize);
    if (tower) {
      setActiveTower(tower);
    } else {
      setActiveTower(null);
    }
  };
};
