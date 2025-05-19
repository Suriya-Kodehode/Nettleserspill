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
  
  let canPlace = true;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cellKey = `${Math.floor(snapped.left / gridCellSize) + c}-${Math.floor(snapped.top / gridCellSize) + r}`;
      if (restrictedCellsArray.includes(cellKey) || restrictedCellsArray.includes(cellKey.replace("-", ","))) {
        canPlace = false;
        break;
      }
    }
    if (!canPlace) break;
  }
  if (!canPlace) return;
  
  setPlacedTowers((prev) =>
    prev.map((t) =>
      t.id === relocatingTower.id
        ? { ...t, left: snapped.left, top: snapped.top, x: snapped.left, y: snapped.top }
        : t
    )
  );
  setRelocatingTower(null);
  setGhostRelocatePos(null);
};

export const cancelRelocation = (setRelocatingTower, setGhostRelocatePos) => {
  setRelocatingTower(null);
  setGhostRelocatePos(null);
};

export const handleUnifiedPlacement = (
  {
    selectedTower,
    setSelectedTower,
    previewPos,
    setPreviewPos,
    relocatingTower,
    setRelocatingTower,
    relocatePos,
    setRelocatePos,
    gridCellSize,
    restrictedCellsArray,
    placedTowers,
    setPlacedTowers,
  },
  e,
  containerRect
) => {
  const tower = selectedTower || relocatingTower;
  if (!tower) return;
  
  const preview = selectedTower ? previewPos : relocatePos;
  if (!preview) return;
  
  const cols = tower.gridHighlight?.cols || 2;
  const rows = tower.gridHighlight?.rows || 2;
  const towerDimensions = { width: gridCellSize * cols, height: gridCellSize * rows };

  const rect = containerRect || e.currentTarget.getBoundingClientRect();
  const snapped = snapPreviewToGrid(preview, gridCellSize, towerDimensions);
  
  let canPlace = true;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cellKey = `${Math.floor(snapped.left / gridCellSize) + c}-${Math.floor(snapped.top / gridCellSize) + r}`;
      if (restrictedCellsArray.includes(cellKey) || restrictedCellsArray.includes(cellKey.replace("-", ","))) {
        canPlace = false;
        break;
      }
    }
    if (!canPlace) break;
  }
  if (!canPlace) return;
  
  if (selectedTower) {
    const newTower = {
      ...selectedTower,
      left: snapped.left,
      top: snapped.top,
      x: snapped.left,
      y: snapped.top,
      id: generateRandomId(),
    };
    setPlacedTowers((prev) => [...prev, newTower]);
    setSelectedTower(null);
    setPreviewPos(null);
  }
};

export const createHandleCellClick = (
  selectedTower,
  previewPos,
  gridCellSize,
  restrictedCellsArray,
  placedTowers,
  setPlacedTowers,
  setSelectedTower,
  setPreviewPos
) => {
  return ({ col, row, event }) => {
    if (!selectedTower) return;
    const cellPos =
      previewPos || { col, row, left: col * gridCellSize, top: row * gridCellSize };
    const { cols = 2, rows = 2 } = selectedTower.gridHighlight || {};
    let canPlace = true;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cellKey = `${cellPos.col + c}-${cellPos.row + r}`;
        if (restrictedCellsArray.includes(cellKey) || restrictedCellsArray.includes(cellKey.replace("-", ","))) {
          canPlace = false;
          break;
        }
      }
      if (!canPlace) break;
    }
    if (!canPlace) return;
    const left = cellPos.col * gridCellSize;
    const top = cellPos.row * gridCellSize;
    const newTower = {
      ...selectedTower,
      left,
      top,
      x: left,
      y: top,
      id: generateRandomId(),
    };
    setPlacedTowers((prev) => [...prev, newTower]);
    setSelectedTower(null);
    setPreviewPos(null);
  };
};

export const createMapMouseMoveHandler = (
  relocatingTower,
  gridCellSize,
  setGhostRelocatePos,
  defaultMouseMoveHandler = null
) => {
  return (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (relocatingTower) {
      const { cols = 2, rows = 2 } = relocatingTower.gridHighlight || {};
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
  gridCellSize,
  placedTowers,
  setPlacedTowers,
  setRelocatingTower,
  setGhostRelocatePos,
  restrictedCellsArray,
  defaultClickHandler = null,
  relocatePos
) => {
  return (e, containerRect) => {
    if (relocatingTower) {
      handleUnifiedPlacement(
        {
          selectedTower: null,
          setSelectedTower: () => {},
          previewPos: null,
          setPreviewPos: () => {},
          relocatingTower,
          setRelocatingTower,
          relocatePos,
          setRelocatePos: setGhostRelocatePos,
          gridCellSize,
          restrictedCellsArray,
          placedTowers,
          setPlacedTowers,
        },
        e,
        containerRect
      );
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