import { enemyKeyframesByMap } from "../GameData/pathKeyframeData.jsx";

export const totalDurations = {
  newDawn: 103510,
};

export const getEnemyPath = (mapName) => {
  const keyframes = enemyKeyframesByMap[mapName];
  if (!keyframes || keyframes.length === 0) {
    console.error(`No keyframes defined for map ${mapName}`);
    return [];
  }
  const totalDuration = totalDurations[mapName] || 60000;
  return keyframes.map((frame) => ({
    time: (frame.percent / 100) * totalDuration,
    x: frame.x,
    y: frame.y,
    opacity: frame.opacity,
  }));
};
