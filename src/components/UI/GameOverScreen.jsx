import React from "react";

const GameOverScreen = ({ onRestart }) => {
  return (
    <div
      style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "#fff",
      }}
    >   
      <h1 style={{ fontSize: "4em", margin: 0 }}>Game Over</h1>
      <button
        onClick={onRestart}
        style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "1.2em",
            cursor: "pointer",
            color: "rgba(0, 0, 0, 1)",
            backgroundColor: "#fff",
            fontWeight: "bold",
        }}
      >
        Restart Game
      </button>
    </div>
  );
};

export default GameOverScreen;
