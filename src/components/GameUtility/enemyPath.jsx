export const totalDurations = {
  newDawn: 103510,
};

const enemyKeyframesByMap = {
  newDawn: [
    { percent: 0, x: -200, y: -200, opacity: 0 },
    { percent: 3.45, x: -24, y: 320, opacity: 1 },
    { percent: 6.9, x: 200, y: 320, opacity: 1 },
    { percent: 10.35, x: 200, y: 456, opacity: 1 },
    { percent: 13.79, x: 360, y: 456, opacity: 1 },
    { percent: 17.24, x: 360, y: 230, opacity: 1 },
    { percent: 20.69, x: 448, y: 230, opacity: 1 },
    { percent: 24.14, x: 448, y: 324, opacity: 1 },
    { percent: 27.59, x: 528, y: 324, opacity: 1 },
    { percent: 31.03, x: 528, y: 90, opacity: 1 },
    { percent: 34.48, x: 656, y: 90, opacity: 1 },
    { percent: 37.93, x: 656, y: 538, opacity: 1 },
    { percent: 42.38, x: 1032, y: 538, opacity: 1 },
    { percent: 43.0, x: 1048, y: 524, opacity: 1 },
    { percent: 48.28, x: 1296, y: 524, opacity: 1 },
    { percent: 51.72, x: 1296, y: 424, opacity: 1 },
    { percent: 55.17, x: 1096, y: 424, opacity: 1 },
    { percent: 58.62, x: 1096, y: 220, opacity: 1 },
    { percent: 62.07, x: 1312, y: 220, opacity: 1 },
    { percent: 65.52, x: 1312, y: 60, opacity: 1 },
    { percent: 68.97, x: 760, y: 60, opacity: 1 },
    { percent: 72.41, x: 760, y: 176, opacity: 1 },
    { percent: 75.86, x: 992, y: 176, opacity: 1 },
    { percent: 79.31, x: 992, y: 320, opacity: 1 },
    { percent: 82.76, x: 1053, y: 320, opacity: 1 },
    { percent: 86.21, x: 1056, y: 320, opacity: 0 },
    { percent: 89.66, x: 1136, y: 320, opacity: 0 },
    { percent: 93.1, x: 1137, y: 320, opacity: 1 },
    { percent: 96.55, x: 1400, y: 320, opacity: 1 },
    { percent: 100.0, x: 1400, y: 320, opacity: 1 },
  ],
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
