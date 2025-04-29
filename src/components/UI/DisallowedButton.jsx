import React from "react";

const DisallowedButton = ({ showDisallowed, toggleShowDisallowed }) => {
  const buttonStyle = {
    width: "fit-content",
    height: "35px",
    padding: "5px 10px",
    fontSize: "1rem",
    cursor: "pointer",
    backgroundColor: showDisallowed ? "#e74c3c" : "#4CAF50",
    border: "none",
    borderRadius: "4px",
    marginTop: "10px",
    zIndex: 1,
  };

  const handleMouseOver = (e) => {
    e.currentTarget.style.backgroundColor = showDisallowed ? "#c0392b" : "#27ae60";
  };

  const handleMouseOut = (e) => {
    e.currentTarget.style.backgroundColor = showDisallowed ? "#e74c3c" : "#4CAF50";
  };

  return (
    <button
      style={buttonStyle}
      onClick={toggleShowDisallowed}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {showDisallowed ? "Hide Disallowed Areas" : "Show Disallowed Areas"}
    </button>
  );
};

export default DisallowedButton;
