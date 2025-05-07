
export const drawGrid = (context, width, height, cellSize = 16, showCoordinates = false) => {
  context.save();
  
  // Draw grid lines
  context.strokeStyle = "rgba(0, 0, 0, 0.5)";
  context.lineWidth = 1;
  context.beginPath();
  for (let x = 0; x <= width; x += cellSize) {
    context.moveTo(x, 0);
    context.lineTo(x, height);
  }
  for (let y = 0; y <= height; y += cellSize) {
    context.moveTo(0, y);
    context.lineTo(width, y);
  }
  context.stroke();

  // Optionally add coordinates over each cell
  if (showCoordinates) {
    context.fillStyle = "white";
    context.font = "10px Arial";
    for (let x = 0; x < width; x += cellSize) {
      for (let y = 0; y < height; y += cellSize) {
        const col = Math.floor(x / cellSize);
        const row = Math.floor(y / cellSize);
        context.fillText(`(${col},${row})`, x + 2, y + 12);
      }
    }
  }
  
  context.restore();
};
