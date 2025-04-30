import { getDefaultEnemyProperties } from "../GameUtility/enemyDefaults.jsx";

export const spawnEnemies = (config, sprites) => {
  const { spawnDelay, waves } = config;
  const timeoutIds = [];
  let waveIndex = 0;

  const enemySpawnGap =
    config.enemySpawnGap !== undefined ? config.enemySpawnGap : 3000;

  const maxRandomDelay =
    config.maxRandomDelay !== undefined ? config.maxRandomDelay : 200;
  const maxSpriteSeparation =
    config.maxSpriteSeparation !== undefined ? config.maxSpriteSeparation : 10;
  const defaultLane = config.defaultLane !== undefined ? config.defaultLane : 0;

  const waveInterval =
    config.waveInterval !== undefined ? config.waveInterval : 2000;

  const spawnWave = (setEnemies) => {
    if (waveIndex >= waves.length) {
      console.log("All waves have spawned. No further enemy spawns.");
      return;
    }

    const currentWave = waves[waveIndex];

    let maxWaveDelay = 0;

    Object.entries(currentWave).forEach(([spriteType, count]) => {
      for (let i = 0; i < count; i++) {
        const randomDelay = Math.random() * maxRandomDelay;
        const precomputedDelay = spawnDelay + i * enemySpawnGap + randomDelay;

        if (precomputedDelay > maxWaveDelay) {
          maxWaveDelay = precomputedDelay;
        }
        const spriteOffset =
          Math.random() * maxSpriteSeparation - maxSpriteSeparation / 2;

        const {
          hp: defaultHP,
          hitbox: defaultHitbox,
          damage: defaultDamage,
        } = getDefaultEnemyProperties(spriteType);

        const enemy = {
          id: `${spriteType}-wave${waveIndex}-${i + 1}`,
          sprite: spriteType,
          spawnTime: 0,
          hp: defaultHP,
          hitbox: { ...defaultHitbox },
          damage: defaultDamage,
          lane: defaultLane,
          spriteOffset: spriteOffset,
          randomOffset: randomDelay,
        };

        const timeoutId = setTimeout(() => {
          const actualSpawnTime = performance.now();
          setEnemies((prevEnemies) => [
            ...prevEnemies,
            { ...enemy, spawnTime: actualSpawnTime },
          ]);
        }, precomputedDelay);
        timeoutIds.push(timeoutId);
      }
    });

    waveIndex++;

    if (waveIndex < waves.length) {
      const nextWaveDelay = maxWaveDelay + waveInterval;
      const timeoutId = setTimeout(() => spawnWave(setEnemies), nextWaveDelay);
      timeoutIds.push(timeoutId);
    }
  };

  return { spawnWave, timeoutIds };
};
