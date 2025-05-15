import React, { useState } from "react";
import { iconImages } from "../../../../src/assets/imageSource.jsx";

const TowerOptions = ({
  activeTower,
  gridCellSize,
  onRelocate,
  onUpgrade,
  moveIconFilter = "", 
  upgradeIconFilter = ""
}) => {
  if (!activeTower) return null;

  const cols = activeTower.gridHighlight?.cols || 2;
  const towerWidth = gridCellSize * cols;

  const containerStyle = {
    position: "absolute",
    left: activeTower.left + towerWidth / 2,
    top: activeTower.top - 60, 
    padding: "10px",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: "5px",
    zIndex: 2000,
    display: "flex",
    justifyContent: "center",
    transform: "translateX(-50%)",
  };

  const [hoverRelocate, setHoverRelocate] = useState(false);
  const [hoverUpgrade, setHoverUpgrade] = useState(false);

  const buttonStyle = {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    margin: "0 5px",
    padding: "5px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const iconStyle = {
    width: "24px",
    height: "24px",
  };

  const relocateButtonStyle = {
    ...buttonStyle,
    backgroundColor: hoverRelocate ? "orange" : "transparent",
  };

  const upgradeButtonStyle = {
    ...buttonStyle,
    backgroundColor: hoverUpgrade ? "orange" : "transparent",
  };

  return (
    <div style={containerStyle}>
      <button
        style={relocateButtonStyle}
        onClick={onRelocate}
        onMouseOver={() => setHoverRelocate(true)}
        onMouseOut={() => setHoverRelocate(false)}
      >
        <img
          src={iconImages.moveIcon}
          alt="Relocate"
          style={{ ...iconStyle, filter: moveIconFilter }}
        />
      </button>
      <button
        style={upgradeButtonStyle}
        onClick={onUpgrade}
        onMouseOver={() => setHoverUpgrade(true)}
        onMouseOut={() => setHoverUpgrade(false)}
      >
        <img
          src={iconImages.upgradeIcon}
          alt="Upgrade"
          style={{ ...iconStyle, filter: upgradeIconFilter }}
        />
      </button>
    </div>
  );
};

export default TowerOptions;
