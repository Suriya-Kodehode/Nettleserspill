import { mapConfigs } from "../GameUtility/mapConfig.jsx"

export const generateEnemiesForMap = (mapName, sprites) => {
    if (!mapConfigs[mapName]) {
        throw new Error(`Invalid map name: ${mapName}.`);
    }
    const { spawnIntervals, spriteCount, spawnDelay } = mapConfigs[mapName];
    const enemies = [];

    Object.keys(spriteCount).forEach((spriteType) => {
        const count = spriteCount[spriteType];
        for (let i = 0; i < count; i++) {
            enemies.push({
                id: enemies.length + 1,
                sprite: spriteType,
                spawnTime: spawnDelay + i * spawnIntervals,
            });
        }
    })
    return enemies
}