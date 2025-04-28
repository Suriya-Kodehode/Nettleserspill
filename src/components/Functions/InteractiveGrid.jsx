import { useRef, useEffect } from "react";

const InteractiveGrid = ({ width, height, gridCellSize = 16, onCellClick }) => {
  const canvasRef = useRef(null);
  // Fixed unit for coordinate calculations (16px regardless of the drawn grid size)
  const coordinateCellSize = 16;

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");

    // Clear previous drawings
    context.clearRect(0, 0, width, height);

    // Draw grid lines based on the adjustable gridCellSize
    context.save();
    context.strokeStyle = "rgba(0, 0, 0, 0.5)";
    context.lineWidth = 1;
    context.beginPath();
    for (let x = 0; x <= width; x += gridCellSize) {
      context.moveTo(x, 0);
      context.lineTo(x, height);
    }
    for (let y = 0; y <= height; y += gridCellSize) {
      context.moveTo(0, y);
      context.lineTo(width, y);
    }
    context.stroke();
    context.restore();
  };

  useEffect(() => {
    redrawCanvas();
  }, [width, height, gridCellSize]);

  // On click, calculate the cell based on a fixed 16px unit.
  // For now, every placement is allowed.
  const handleClick = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const col = Math.floor(x / coordinateCellSize);
    const row = Math.floor(y / coordinateCellSize);
    console.log(`Clicked coordinate: (${col}, ${row})`);
    // By default, allow all placements.
    // Later, you can import placementRules.jsx and check for disallowed coordinates here.
    onCellClick && onCellClick({ col, row });
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "auto", // Captures click events.
        zIndex: 1000, // Ensure it's on top if layered with other canvases.
      }}
      onClick={handleClick}
    >
      Your browser does not support the HTML5 canvas tag.
    </canvas>
  );
};

export default InteractiveGrid;
