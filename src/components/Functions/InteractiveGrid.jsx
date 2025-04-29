import { useRef, useEffect } from "react";

const InteractiveGrid = ({ width, height, gridCellSize = 16, onCellClick, showGrid }) => {
  const canvasRef = useRef(null);
  const coordinateCellSize = gridCellSize;

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    
    context.clearRect(0, 0, width, height);

    if (!showGrid) return;

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
  }, [showGrid, width, height, gridCellSize]);

  const handleClick = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const col = Math.floor(x / coordinateCellSize);
    const row = Math.floor(y / coordinateCellSize);
    console.log(`Clicked coordinate: (${col}, ${row})`);

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
        pointerEvents: "auto",
        zIndex: 1000,
      }}
      onClick={handleClick}
    >
      Your browser does not support the HTML5 canvas tag.
    </canvas>
  );
};

export default InteractiveGrid;
