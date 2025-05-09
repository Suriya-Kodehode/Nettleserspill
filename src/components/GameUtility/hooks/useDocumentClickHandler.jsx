
import { useEffect } from "react";
import { createDocumentClickHandler } from "../Handlers/generalHandlers.jsx";

const useDocumentClickHandler = (
  towerSelectionRef,
  setSelectedTower,
  setActiveTower,
  setRelocatingTower
) => {
  useEffect(() => {
    const docClickHandler = createDocumentClickHandler(
      towerSelectionRef,
      setSelectedTower,
      setActiveTower,
      setRelocatingTower
    );
    document.addEventListener("mousedown", docClickHandler);
    return () => {
      document.removeEventListener("mousedown", docClickHandler);
    };
  }, [towerSelectionRef, setSelectedTower, setActiveTower, setRelocatingTower]);
};

export default useDocumentClickHandler;
