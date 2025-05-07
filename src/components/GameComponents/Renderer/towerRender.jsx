
export const renderTowersOnCanvas = (
    context,
    towers,
    resolvedAnimated,
    assetImages
  ) => {
    if (!towers || towers.length === 0) return;
    towers.forEach((tower) => {
      const towerFrames =
        resolvedAnimated[tower.sprite] ||
        (assetImages[tower.sprite] ? [assetImages[tower.sprite]] : []);
      if (towerFrames && towerFrames.length > 0) {
        context.drawImage(
          towerFrames[0],
          tower.x,
          tower.y,
          tower.width,
          tower.height
        );
      }
    });
  };
  