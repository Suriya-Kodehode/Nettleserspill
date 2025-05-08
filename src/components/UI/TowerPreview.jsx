import React from "react";

const TowerPreview = ({
  previewPos,
  gridCellSize,
  selectedTower,
  restrictedCellsArray,
  style,
}) => {
  if (!previewPos || !selectedTower) return null;
  
  const { cols = 2, rows = 2 } = selectedTower.gridHighlight || {};

  const width = gridCellSize * cols;
  const height = gridCellSize * rows;

  return (
    <div
      style={{
        position: "absolute",
        top: previewPos.top,
        left: previewPos.left,
        width,
        height,
        pointerEvents: "none",
        transform: "translate(-50%, -50%)", 
        ...style,
      }}
    >
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: cols }).map((_, c) => {
          const previewCol = previewPos.col || 0;
          const previewRow = previewPos.row || 0;
          const cellKey = `${previewCol + c}-${previewRow + r}`;
          const isRestricted =
            restrictedCellsArray.includes(cellKey) ||
            restrictedCellsArray.includes(cellKey.replace("-", ","));
          return (
            <div
              key={cellKey}
              style={{
                position: "absolute",
                top: r * gridCellSize,
                left: c * gridCellSize,
                width: gridCellSize,
                height: gridCellSize,
                boxSizing: "border-box",
                backgroundColor: isRestricted
                  ? "rgba(255, 165, 0, 0.5)" // orange for disallowed
                  : "rgba(0, 128, 0, 0.3)",   // green for allowed
                border: `1px solid ${isRestricted ? "orange" : "lime"}`,
              }}
            ></div>
          );
        })
      )}
      <img
        src={selectedTower.src}
        alt={selectedTower.name}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          opacity: 1, 
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
    </div>
  );
};

export default TowerPreview;
