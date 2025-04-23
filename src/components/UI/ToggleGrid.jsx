const ToggleGrid = ({ showGrid, onToggle, gridCellSize, onCellSizeChange }) => {
    return (
      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
          top: -120,
          right: 10,
          zIndex: 10,
          backgroundColor: "black",
          padding: "10px",
          borderRadius: "4px",
        }}
      >
        <button
          onClick={onToggle}
          style={{
            float: "right",
            width: "100px",
            height: "30px",
            padding: "2px 10px",
            fontSize: "1rem",
            cursor: "pointer",
            backgroundColor: showGrid ? "#f44336" : "#4CAF50",
          }}
        >
          {showGrid ? "Hide Grid" : "Show Grid"}
        </button>
        {showGrid && (
          <div
            style={{
              marginTop: "10px",
              fontSize: "0.9rem",
            }}
          >
            <label htmlFor="gridSize" style={{ color: "white" }}>
              Grid Size:
            </label>
            <input
              id="gridSize"
              type="range"
              min="8"
              max="128"
              value={gridCellSize}
              onChange={(e) => onCellSizeChange(Number(e.target.value))}
              style={{ marginLeft: "5px" }}
            />
            <div
              style={{
                marginTop: "5px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span style={{ marginLeft: "5px", color: "white" }}>
                {gridCellSize}px
              </span>
              <input
                type="number"
                min="8"
                max="128"
                value={gridCellSize}
                onChange={(e) => onCellSizeChange(Number(e.target.value))}
                style={{ marginLeft: "10px", width: "60px" }}
              />
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default ToggleGrid;
  