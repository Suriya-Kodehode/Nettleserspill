import { useState, useCallback } from "react";

export const usePreview = (selectedTower, gridCellSize) => {
  const [previewPos, setPreviewPos] = useState(null);

  const updatePreview = useCallback(
    (e) => {
      if (!selectedTower) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const { cols = 2, rows = 2 } = selectedTower.gridHighlight || {};
      const towerWidth = gridCellSize * cols;
      const towerHeight = gridCellSize * rows;
      const left = e.clientX - rect.left - towerWidth / 2;
      const top = e.clientY - rect.top - towerHeight / 2;
      setPreviewPos({
        left,
        top,
        col: Math.floor(left / gridCellSize),
        row: Math.floor(top / gridCellSize),
      });
    },
    [gridCellSize, selectedTower]
  );

  const clearPreview = useCallback(() => {
    setPreviewPos(null);
  }, []);

  return [previewPos, updatePreview, clearPreview, setPreviewPos];
};

export default usePreview;