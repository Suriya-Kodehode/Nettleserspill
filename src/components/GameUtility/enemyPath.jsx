export const total_duration = 103510;

const enemyKeyframes = [
    { percent: 0, x: 0, y: 0, opacity: 0 },
    { percent: 3.45, x: -24, y: 320, opacity: 1 },
    { percent: 6.90, x: 200, y: 320, opacity: 1 },
    { percent: 10.35, x: 200, y: 456, opacity: 1 },
    { percent: 13.79, x: 360, y: 456, opacity: 1 },
    { percent: 17.24, x: 360, y: 224, opacity: 1 },
    { percent: 20.69, x: 448, y: 224, opacity: 1 },
    { percent: 24.14, x: 448, y: 320, opacity: 1 },
    { percent: 27.59, x: 528, y: 320, opacity: 1 },
    { percent: 31.03, x: 528, y: 80, opacity: 1 },
    { percent: 34.48, x: 656, y: 80, opacity: 1 },
    { percent: 37.93, x: 656, y: 544, opacity: 1 },
    { percent: 42.38, x: 1032, y: 544, opacity: 1 },
    { percent: 43.00, x: 1048, y: 528, opacity: 1 },
    { percent: 48.28, x: 1296, y: 528, opacity: 1 },
    { percent: 51.72, x: 1296, y: 424, opacity: 1 },
    { percent: 55.17, x: 1096, y: 424, opacity: 1 },
    { percent: 58.62, x: 1096, y: 216, opacity: 1 },
    { percent: 62.07, x: 1312, y: 216, opacity: 1 },
    { percent: 65.52, x: 1312, y: 48, opacity: 1 },
    { percent: 68.97, x: 760, y: 48, opacity: 1 },
    { percent: 72.41, x: 760, y: 168, opacity: 1 },
    { percent: 75.86, x: 992, y: 168, opacity: 1 },
    { percent: 79.31, x: 992, y: 320, opacity: 1 },
    { percent: 82.76, x: 1053, y: 320, opacity: 1 },
    { percent: 86.21, x: 1056, y: 320, opacity: 0 },
    { percent: 89.66, x: 1136, y: 320, opacity: 0 },
    { percent: 93.10, x: 1137, y: 320, opacity: 1 },
    { percent: 96.55, x: 1400, y: 320, opacity: 1 },
    { percent: 100.00, x: 1400, y: 320, opacity: 1 }
]

export const enemyPath = enemyKeyframes.map(frame => ({
    time: (frame.percent / 100) * total_duration,
    x: frame.x,
    y: frame.y,
    opacity: frame.opacity
}))