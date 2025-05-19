export const renderTowersOnCanvas = (
  context,
  towers,
  resolvedAnimated,
  assetImages,
  gridCellSize = 16,
  timestamp = 0
) => {
  if (!towers || towers.length === 0) return;

  towers.forEach((tower) => {
    let towerImage = null;

    if (resolvedAnimated[tower.src] && resolvedAnimated[tower.src].length > 0) {
      const frames = resolvedAnimated[tower.src];
      const frameDelay = frames.frameDelay || 100;
      const frameIndex = Math.floor(timestamp / frameDelay) % frames.length;
      console.log(
        `Rendering tower ${tower.id} with animated frames for "${tower.src}" - ${frames.length} frames available`
      );
      towerImage = frames[frameIndex];
    } else if (assetImages && assetImages[tower.src]) {
      towerImage = assetImages[tower.src];
    } else {
      towerImage = tower.src;
      if (typeof towerImage === "string") {
        const img = new Image();
        img.src = towerImage;
        towerImage = img;
      }
    }

    if (!towerImage) return;

    const x = tower.x !== undefined ? tower.x : (tower.left || 0);
    const y = tower.y !== undefined ? tower.y : (tower.top || 0);

    let width = tower.width;
    let height = tower.height;
    if (width === undefined || height === undefined) {
      const defaultCols = tower.gridHighlight ? tower.gridHighlight.cols : 2;
      const defaultRows = tower.gridHighlight ? tower.gridHighlight.rows : 2;
      width = gridCellSize * defaultCols;
      height = gridCellSize * defaultRows;
    }

    context.drawImage(towerImage, x, y, width, height);
  });
};