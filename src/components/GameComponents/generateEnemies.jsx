import { getDefaultEnemyProperties } from "../GameUtility/enemyDefaults.jsx";

export function generateEnemy(
  spriteType,
  waveIndex,
  enemyIndex,
  config,
  randomDelay,
  spriteOffset
) {
  const { defaultLane = 0, centerLane, offsetX = 0, offsetY = 0 } = config;
  const {
    hp: defaultHP,
    hitbox: defaultHitbox,
    damage: defaultDamage,
  } = getDefaultEnemyProperties(spriteType);

  const lane =
    spriteType === "boss"
      ? centerLane !== undefined
        ? centerLane
        : defaultLane
      : defaultLane;

  const enemy = {
    id: `${spriteType}-wave${waveIndex}-${enemyIndex + 1}`,
    sprite: spriteType,
    spawnTime: 0,
    hp: defaultHP,
    hitbox: { ...defaultHitbox },
    damage: defaultDamage,
    lane,
    spriteOffset,
    randomOffset: randomDelay,
  };

  if (spriteType === "boss") {
    enemy.bossOffsetX = offsetX;
    enemy.bossOffsetY = offsetY;
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
}
