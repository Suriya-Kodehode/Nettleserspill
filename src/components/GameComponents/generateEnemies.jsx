import { mapConfigs } from "../GameUtility/mapConfig.jsx";
import { getDefaultEnemyProperties } from "../GameUtility/enemyDefaults.jsx";

export const generateEnemiesForMap = (mapName) => {
  const mapConfig = mapConfigs[mapName];
  if (!mapConfig) {
    throw new Error(`Invalid map name: ${mapName}.`);
  }

  const { spawnIntervals, spriteCount, spawnDelay } = mapConfig;

  const totalCount = Object.values(spriteCount).reduce((sum, count) => sum + count, 0);
  const enemies = new Array(totalCount);
  let idx = 0;

  for (const [spriteType, count] of Object.entries(spriteCount)) {
   
    const { hp: defaultHP, hitbox: defaultHitbox } = getDefaultEnemyProperties(spriteType);
    for (let i = 0; i < count; i++) {
      enemies[idx] = {
        id: idx + 1,
        sprite: spriteType,
        spawnTime: spawnDelay + i * spawnIntervals,
        hp: defaultHP,
        hitbox: { ...defaultHitbox },
      };
      idx++;
    }
  }

  return enemies;
};
