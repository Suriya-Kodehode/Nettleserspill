import React from "react";

const DisallowedOverlay = ({ restrictedCells, gridCellSize }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      {restrictedCells.map((cellKey) => {
        const [col, row] = cellKey.split(",").map(Number);
        return (
          <div
            key={cellKey}
            style={{
              position: "absolute",
              left: col * gridCellSize,
              top: row * gridCellSize,
              width: gridCellSize,
              height: gridCellSize,
              backgroundColor: "rgba(255, 0, 0, 0.4)",
              border: "1px solid rgba(255, 0, 0, 0.8)",
            }}
          ></div>
        );
      })}
    </div>
  );
};

export default DisallowedOverlay;