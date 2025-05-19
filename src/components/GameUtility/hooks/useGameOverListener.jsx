import { useEffect } from "react";

const useGameOverListener = (setGameOver) => {
  useEffect(() => {
    const handleGameOver = (e) => {
      if (e.detail.gameOver) {
        setGameOver(true);
      }
    };
    window.addEventListener("gameOver", handleGameOver);
    return () => window.removeEventListener("gameOver", handleGameOver);
  }, [setGameOver]);
};

export default useGameOverListener;