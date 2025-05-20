export const snapPreviewToGrid = (preview, gridCellSize, towerDimensions) => {
  const { width, height } = towerDimensions;
  const centerX = preview.left + width / 2;
  const centerY = preview.top + height / 2;
  const newCol = Math.floor(centerX / gridCellSize);
  const newRow = Math.floor(centerY / gridCellSize);
  return {
    left: newCol * gridCellSize,
    top: newRow * gridCellSize,
  };
};