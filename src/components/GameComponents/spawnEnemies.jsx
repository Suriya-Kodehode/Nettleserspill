import { getDefaultEnemyProperties } from "../GameUtility/enemyDefaults.jsx";

export const spawnEnemies = (config, sprites) => {
  const { spawnIntervals, waves, spawnDelay } = config;
  const timeoutIds = [];
  let waveIndex = 0;

  const maxRandomDelay = config.maxRandomDelay !== undefined ? config.maxRandomDelay : 500;
  const spawnIntervalMultiplier =
    config.spawnIntervalMultiplier !== undefined ? config.spawnIntervalMultiplier : 1;
  const maxSpriteSeparation =
    config.maxSpriteSeparation !== undefined ? config.maxSpriteSeparation : 10;
  const defaultLane = config.defaultLane !== undefined ? config.defaultLane : 0;
  
  const waveInterval =
    config.waveInterval !== undefined ? config.waveInterval : spawnDelay;

  const spawnWave = (setEnemies) => {
    if (waveIndex >= waves.length) {
      console.log("All waves have spawned. No further enemy spawns.");
      return;
    }

    const currentWave = waves[waveIndex];
    const waveEnemies = [];

    Object.entries(currentWave).forEach(([spriteType, count]) => {
      const { hp: defaultHP, hitbox: defaultHitbox } =
        getDefaultEnemyProperties(spriteType);

      for (let i = 0; i < count; i++) {
        const lane = defaultLane;
        const randomDelay = Math.random() * maxRandomDelay;
        const enemySpawnTime =
          i * spawnIntervals * spawnIntervalMultiplier + spawnDelay + randomDelay;
        const spriteOffset =
          Math.random() * maxSpriteSeparation - maxSpriteSeparation / 2;

        waveEnemies.push({
          id: `${spriteType}-wave${waveIndex}-${i + 1}`,
          sprite: spriteType,
          spawnTime: enemySpawnTime,
          hp: defaultHP,
          hitbox: { ...defaultHitbox },
          lane: lane,
          randomOffset: randomDelay,
          spriteOffset: spriteOffset,
        });
      }
    });

    setEnemies((prevEnemies) => prevEnemies.concat(waveEnemies));
    waveIndex++;

    if (waveIndex < waves.length) {
      const timeoutId = setTimeout(() => spawnWave(setEnemies), waveInterval);
      timeoutIds.push(timeoutId);
    }
  };

  return { spawnWave, timeoutIds };
};
