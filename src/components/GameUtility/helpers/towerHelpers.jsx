export const getClickedTower = (x, y, towers, gridCellSize) => {
  for (let i = towers.length - 1; i >= 0; i--) {
    const tower = towers[i];
    const { cols = 2, rows = 2 } = tower.gridHighlight || {};
    const towerWidth = gridCellSize * cols;
    const towerHeight = gridCellSize * rows;
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
