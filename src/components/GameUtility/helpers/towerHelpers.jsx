export const getClickedTower = (x, y, towers, gridCellSize) => {
  for (let i = towers.length - 1; i >= 0; i--) {
    const tower = towers[i];
    const towerWidth = tower.width || gridCellSize * (tower.gridHighlight?.cols || 2);
    const towerHeight = tower.height || gridCellSize * (tower.gridHighlight?.rows || 2);
    
    if (
      x >= tower.left &&
      x <= tower.left + towerWidth &&
      y >= tower.top &&
      y <= tower.top + towerHeight
    ) {
      return tower;
    }
  }
  return null;
};