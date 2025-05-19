
export const createDocumentClickHandler = (
  towerSelectionRef,
  setSelectedTower,
  setActiveTower,
  setRelocatingTower
) => {
  return (e) => {
    if (
      (towerSelectionRef.current && towerSelectionRef.current.contains(e.target)) ||
      (e.target && e.target.classList && e.target.classList.contains("interactive-grid"))
    ) {
      return;
    }
    setSelectedTower(null);
    setActiveTower(null);
    setRelocatingTower(null);
  };
};

export const handleRestart = ({
  setGameOver,
  setPlacedTowers,
  setSelectedTower,
  setActiveTower,
  setRelocatingTower,
  setPreviewPos,
  player,
  initialPlayerHP = 100,
}) => {
  setGameOver(false);
  player.hp = initialPlayerHP;
  setPlacedTowers([]);
  setSelectedTower(null);
  setActiveTower(null);
  setRelocatingTower(null);
  setPreviewPos(null);
};