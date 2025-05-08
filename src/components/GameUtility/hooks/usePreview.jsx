// /src/components/GameUtility/hooks/usePreview.jsx
import { useState, useCallback } from "react";

export const usePreview = (selectedTower, gridCellSize) => {
  const [previewPos, setPreviewPos] = useState(null);

  const updatePreview = useCallback(
    (e) => {
      if (!selectedTower) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const left = e.clientX - rect.left;
      const top = e.clientY - rect.top;
      const col = Math.floor(left / gridCellSize);
      const row = Math.floor(top / gridCellSize);
      setPreviewPos({ left, top, col, row });
    },
    [gridCellSize, selectedTower]
  );

  const clearPreview = useCallback(() => {
    setPreviewPos(null);
  }, []);

  return [previewPos, updatePreview, clearPreview, setPreviewPos];
};

export default usePreview;
