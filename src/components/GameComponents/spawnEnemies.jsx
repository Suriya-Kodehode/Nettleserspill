
export const spawnEnemies = (config, sprites) => {
    const { spawnIntervals, spriteCount, spawnDelay } = config;
    const enemies = [];
    let spawnIndex = {};
    const timeoutIds = [];

    Object.keys(spriteCount).forEach((spriteType) => {
        spawnIndex[spriteType] = 0;
    })

    const spawnEnemy = (setEnemies) => {
        Object.entries(spriteCount).forEach(([spriteType, count]) => {
            if(spawnIndex[spriteType] < count) {
                enemies.push({
                    id: `${spriteType}-${spawnIndex[spriteType] + 1}`,
                    sprite: spriteType,
                    spawnTime: spawnIndex[spriteType] * spawnIntervals + spawnDelay,
                })
                spawnIndex[spriteType]++;
            }
        })

        setEnemies([...enemies]);
        const timeoutId = setTimeout(() => spawnEnemy(setEnemies), spawnIntervals);
        timeoutIds.push(timeoutId);
    }

    return { spawnEnemy, timeoutIds };
}