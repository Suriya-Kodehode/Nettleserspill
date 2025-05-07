
import { useRef, useEffect } from "react";
import { drawGrid } from "../Functions/GridTool/drawGrid";

const CanvasGrid = ({ width, height, gridCellSize = 16, style = {} }) => {
  const gridCanvasRef = useRef(null);

  useEffect(() => {
    const canvas = gridCanvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, width, height);
    drawGrid(context, width, height, gridCellSize);
  }, [width, height, gridCellSize]);

  return (
    <canvas
      ref={gridCanvasRef}
      width={width}
      height={height}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        ...style,
      }}
    >
      Your browser does not support the HTML5 canvas tag.
    </canvas>
  );
};

export default CanvasGrid;
