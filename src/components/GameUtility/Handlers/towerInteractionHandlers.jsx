import { generateRandomId } from "../helpers/randomIdGenerator.jsx";
import { snapPreviewToGrid } from "../helpers/gridSnapping.jsx";

export const handleRelocateStart = (activeTower, setRelocatingTower) => {
  if (!activeTower) return;
  setRelocatingTower(activeTower);
};

export const finalizeRelocationUpdate = (
  relocatingTower,
  ghostRelocatePos,
  gridCellSize,
  restrictedCellsArray,
  setPlacedTowers,
  setRelocatingTower,
  setGhostRelocatePos
) => {
  if (!relocatingTower || !ghostRelocatePos) return;
  
  const cols = relocatingTower.gridHighlight?.cols || 2;
  const rows = relocatingTower.gridHighlight?.rows || 2;
  const towerDimensions = { width: gridCellSize * cols, height: gridCellSize * rows };
  
  const snapped = snapPreviewToGrid(ghostRelocatePos, gridCellSize, towerDimensions);
  console.log("Finalized snapped position:", snapped);
  
  let canPlace = true;
  for (let r = 0; r < rows && canPlace; r++) {
    for (let c = 0; c < cols; c++) {
      const cellKey = `${Math.floor(snapped.left / gridCellSize) + c}-${Math.floor(snapped.top / gridCellSize) + r}`;
      if (
        restrictedCellsArray.includes(cellKey) ||
        restrictedCellsArray.includes(cellKey.replace("-", ","))
      ) {
        canPlace = false;
        console.log("Restricted cell encountered during relocation:", cellKey);
        break;
      }
    }
  }
  if (!canPlace) return;
  
  setPlacedTowers((prev) =>
    prev.map((t) =>
      t.id === relocatingTower.id
        ? { ...t, left: snapped.left, top: snapped.top, x: snapped.left, y: snapped.top }
        : t
    )
  );
  console.log("Relocation finalized for tower:", relocatingTower.id);
  setRelocatingTower(null);
  setGhostRelocatePos(null);
};

export const cancelRelocation = (setRelocatingTower, setGhostRelocatePos) => {
  setRelocatingTower(null);
  setGhostRelocatePos(null);
};


export const handleUnifiedPlacement = (
  { selectedTower, setSelectedTower, previewPos, setPreviewPos, gridCellSize, restrictedCellsArray, placedTowers, setPlacedTowers },
  e,
  containerRect
) => {
  if (!selectedTower) {
    console.log("No tower found to place.");
    return;
  }
  if (!previewPos) {
    console.log("No preview position available.");
    return;
  }
  
  const cols = selectedTower.gridHighlight?.cols || 2;
  const rows = selectedTower.gridHighlight?.rows || 2;
  const towerDimensions = { width: gridCellSize * cols, height: gridCellSize * rows };
  const rect = containerRect || e.currentTarget.getBoundingClientRect();
  const snapped = snapPreviewToGrid(previewPos, gridCellSize, towerDimensions);
  console.log("Computed snapped position:", snapped);
  
  let canPlace = true;
  for (let r = 0; r < rows && canPlace; r++) {
    for (let c = 0; c < cols; c++) {
      const cellKey = `${Math.floor(snapped.left / gridCellSize) + c}-${Math.floor(snapped.top / gridCellSize) + r}`;
      if (
        restrictedCellsArray.includes(cellKey) ||
        restrictedCellsArray.includes(cellKey.replace("-", ","))
      ) {
        canPlace = false;
        console.log("Restricted cell encountered:", cellKey);
        break;
      }
    }
  }
  if (!canPlace) {
    console.log("Cannot place tower due to restricted area.");
    return;
  }
  
  const newTower = {
    ...selectedTower,
    left: snapped.left,
    top: snapped.top,
    x: snapped.left,
    y: snapped.top,
    id: generateRandomId(),
    width: gridCellSize * cols,
    height: gridCellSize * rows,
    gridHighlight: { cols, rows },
  };
  console.log("Placing new tower:", newTower);
  setPlacedTowers((prev) => [...prev, newTower]);
  setSelectedTower(null);
  setPreviewPos(null);
};

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
    if (!selectedTower) return;
    const cellPos = previewPos || { col, row, left: col * gridCellSize, top: row * gridCellSize };
    const cols = selectedTower.gridHighlight?.cols || 2;
    const rows = selectedTower.gridHighlight?.rows || 2;
    
    let canPlace = true;
    for (let r = 0; r < rows && canPlace; r++) {
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
    }
    if (!canPlace) {
      console.log("Cannot place tower; area is restricted.");
      return;
    }
    const left = cellPos.col * gridCellSize;
    const top = cellPos.row * gridCellSize;
    const newTower = {
      ...selectedTower,
      left,
      top,
      x: left,
      y: top,
      id: generateRandomId(),
      width: gridCellSize * (selectedTower.gridHighlight?.cols || 2),
      height: gridCellSize * (selectedTower.gridHighlight?.rows || 2),
      gridHighlight: {
        cols: selectedTower.gridHighlight?.cols || 2,
        rows: selectedTower.gridHighlight?.rows || 2,
      },
    };
    console.log("Placing new tower:", newTower);
    setPlacedTowers((prev) => [...prev, newTower]);
    setSelectedTower(null);
    setPreviewPos(null);
  };
};

export const createMapMouseMoveHandler = (
  relocatingTower,
  gridCellSize,
  setGhostRelocatePos,
  defaultMouseMoveHandler = null,
  isRelocateLocked
) => {
  return (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (relocatingTower && !isRelocateLocked) {
      const cols = relocatingTower.gridHighlight?.cols || 2;
      const rows = relocatingTower.gridHighlight?.rows || 2;
      const towerWidth = gridCellSize * cols;
      const towerHeight = gridCellSize * rows;
      const posLeft = e.clientX - rect.left - towerWidth / 2;
      const posTop = e.clientY - rect.top - towerHeight / 2;
      setGhostRelocatePos({ left: posLeft, top: posTop });
      e.currentTarget.style.cursor = "crosshair";
    } else if (defaultMouseMoveHandler) {
      defaultMouseMoveHandler(e);
    }
  };
};

export const createMapClickHandler = (
  relocatingTower,
  defaultClickHandler = null,
) => {
  return (e) => {
    if (relocatingTower) {
      console.log("Relocation click detected.");
      e.stopPropagation();
      e.preventDefault();
    } else if (defaultClickHandler) {
      defaultClickHandler(e);
    }
  };
};

export const handleUpgrade = (activeTower, setActiveTower) => {
  if (!activeTower) return;
  alert(`Upgrading tower ${activeTower.name}!`);
  setActiveTower(null);
};