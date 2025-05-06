import { mapConfigs } from "../GameUtility/mapConfig.jsx";
import { getDefaultEnemyProperties } from "../GameUtility/enemyDefaults.jsx";

export const generateEnemiesForMap = (mapName, sprites) => {
  const mapConfig = mapConfigs[mapName];
  if (!mapConfig) {
    throw new Error(`Invalid map name: ${mapName}.`);
  }

  const { waves, spawnDelay, spawnIntervals = 1000 } = mapConfig;

  const enemies = [];
  let idx = 0;
  let waveOffsetTime = 0;

  for (let waveIndex = 0; waveIndex < waves.length; waveIndex++) {
    const wave = waves[waveIndex];

    // 👇 Treat the entire wave object as spriteCount
    const spriteCount = wave;

    if (!spriteCount || typeof spriteCount !== "object") {
      console.warn(`Wave ${waveIndex} is not a valid object. Skipping...`);
      continue;
    }

    for (const [spriteType, count] of Object.entries(spriteCount)) {
      const { hp: defaultHP, hitbox: defaultHitbox } =
        getDefaultEnemyProperties(spriteType);

      for (let i = 0; i < count; i++) {
        enemies[idx] = {
          id: idx + 1,
          sprite: spriteType,
          spawnTime: spawnDelay + waveOffsetTime + i * spawnIntervals,
          hp: defaultHP,
          hitbox: { ...defaultHitbox },
        };
        idx++;
      }
    }

    const totalEnemiesInWave = Object.values(spriteCount).reduce(
      (sum, count) => sum + count,
      0
    );
    waveOffsetTime += spawnIntervals * totalEnemiesInWave;
  }

  return enemies;
};
