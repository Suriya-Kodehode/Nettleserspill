export const drawGrid = (context, width, height, cellSize = 64) => {
  context.save();
  context.strokeStyle = "rgba(0, 0, 0, 0.2)";
  context.lineWidth = 1;

  for (let x = 0; x <= width; x += cellSize) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
  }

  for (let y = 0; y <= height; y += cellSize) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }
  context.restore();
};