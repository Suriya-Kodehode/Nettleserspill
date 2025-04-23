
export const drawGrid = (context, width, height, cellSize = 16) => {
  context.save();

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
  context.restore();
};
