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

    if (
      tower.sprite &&
      resolvedAnimated[tower.sprite] &&
      resolvedAnimated[tower.sprite].length > 0
    ) {
      const frames = resolvedAnimated[tower.sprite];
      console.log(`Rendering tower ${tower.id} with sprite "${tower.sprite}" - ${frames.length} frames available`);
      const frameIndex = Math.floor(timestamp / 100) % frames.length;
      towerImage = frames[frameIndex];
    } else if (tower.sprite && assetImages[tower.sprite]) {
      towerImage = assetImages[tower.sprite];
    } else {
      towerImage = tower.image;
      if (typeof towerImage === "string") {
        const img = new Image();
        img.src = towerImage;
        towerImage = img;
        tower.image = img;
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
