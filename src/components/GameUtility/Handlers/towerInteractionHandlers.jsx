
export const createHandleCellClick = (
  selectedTower,
  previewPos,
  gridCellSize,
  restrictedCellsArray,
  setPlacedTowers,
  setSelectedTower,
  setPreviewPos
) => {
  return ({ col, row, event }) => {
    if (selectedTower) {
      const cellPos =
        previewPos || {
          col,
          row,
          left: col * gridCellSize,
          top: row * gridCellSize,
        };
      const { cols = 2, rows = 2 } = selectedTower.gridHighlight || {};
      let canPlace = true;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cellKey = `${cellPos.col + c}-${cellPos.row + r}`;
          if (
            restrictedCellsArray.includes(cellKey) ||
            restrictedCellsArray.includes(cellKey.replace("-", ","))
          ) {
            canPlace = false;
            break;
          }
        }
        if (!canPlace) break;
      }
      if (!canPlace) {
        console.log(
          "Cannot place tower here because part of the area is restricted."
        );
        return;
      }
      const left = cellPos.col * gridCellSize;
      const top = cellPos.row * gridCellSize;
      const newTower = { ...selectedTower, top, left, x: left, y: top };
      setPlacedTowers((prev) => [...prev, newTower]);
      setSelectedTower(null);
      setPreviewPos(null);
    }
  };
};

export const createMapMouseMoveHandler = (
  relocatingTower,
  gridCellSize,
  setRelocatePos,
  defaultMouseMoveHandler = null
) => {
  return (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (relocatingTower) {
      const cols = relocatingTower.gridHighlight?.cols || 2;
      const rows = relocatingTower.gridHighlight?.rows || 2;
      const towerWidth = gridCellSize * cols;
      const towerHeight = gridCellSize * rows;
      const posLeft = e.clientX - rect.left - towerWidth / 2;
      const posTop = e.clientY - rect.top - towerHeight / 2;
      setRelocatePos({ left: posLeft, top: posTop });
      e.currentTarget.style.cursor = "crosshair";
    } else if (defaultMouseMoveHandler) {
      defaultMouseMoveHandler(e);
    }
  };
};

export const createMapClickHandler = (
  relocatingTower,
  gridCellSize,
  setPlacedTowers,
  setRelocatingTower,
  setRelocatePos,
  restrictedCellsArray,
  defaultClickHandler = null
) => {
  return (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (relocatingTower) {
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      const newCol = Math.floor(clickX / gridCellSize);
      const newRow = Math.floor(clickY / gridCellSize);
      const newLeft = newCol * gridCellSize;
      const newTop = newRow * gridCellSize;
      const { cols = 2, rows = 2 } = relocatingTower.gridHighlight || {};
      let canPlace = true;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const cellKey = `${newCol + c}-${newRow + r}`;
          if (
            restrictedCellsArray.includes(cellKey) ||
            restrictedCellsArray.includes(cellKey.replace("-", ","))
          ) {
            canPlace = false;
            break;
          }
        }
        if (!canPlace) break;
      }
      if (!canPlace) {
        console.log("Cannot relocate tower here because part of the area is restricted.");
        return;
      }
      const updatedTower = {
        ...relocatingTower,
        left: newLeft,
        top: newTop,
        x: newLeft,
        y: newTop,
      };
      setPlacedTowers((prev) => [...prev, updatedTower]);
      setRelocatingTower(null);
      setRelocatePos(null);
    } else if (defaultClickHandler) {
      defaultClickHandler(e);
    }
  };
};


export const handleRelocateOption = (
  activeTower,
  setPlacedTowers,
  setActiveTower,
  setRelocatingTower
) => {
  if (!activeTower) return;
  setPlacedTowers((prev) => prev.filter((t) => t.id !== activeTower.id));
  setRelocatingTower(activeTower);
  setActiveTower(null);
};


export const getClickedTower = (x, y, towers, gridCellSize) => {
  for (let i = towers.length - 1; i >= 0; i--) {
    const tower = towers[i];
    const cols = tower.gridHighlight?.cols || 2;
    const rows = tower.gridHighlight?.rows || 2;
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

export const handleUpgrade = (activeTower, setActiveTower) => {
  if (!activeTower) return;
  alert(`Upgrading tower ${activeTower.name}!`);
  setActiveTower(null);
};
