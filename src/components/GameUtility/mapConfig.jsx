import { wavesForNewDawn } from "./waveConfig.jsx"

export const mapConfigs = {
    newDawn: {
        mapSrc: "/images/maps/New Dawn.png",
        width: 1360,
        height: 600,
        offsetX: -16,
        offsetY: -32,
        spawnIntervals: 2000,
        spriteCount: {
            monkey: 10,
        },
        waves: wavesForNewDawn,
        waveCount: wavesForNewDawn.length,
        spawnDelay: 1000,
    }
}