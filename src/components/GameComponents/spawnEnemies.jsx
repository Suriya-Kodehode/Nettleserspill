import { getDefaultEnemyProperties } from "../GameUtility/enemyDefaults.jsx";

export const spawnEnemies = (config, sprites) => {
    const { spawnIntervals, waves, spawnDelay } = config;
    const timeoutIds = [];
    let waveIndex = 0;
  
    const spawnWave = (setEnemies) => {
      if (waveIndex >= waves.length) return;
  
      const currentWave = waves[waveIndex];
      const waveEnemies = [];
  
      const entries = Object.entries(currentWave);
      for (let entryIndex = 0; entryIndex < entries.length; entryIndex++) {
        const [spriteType, count] = entries[entryIndex];
        const { hp: defaultHP, hitbox: defaultHitbox } = getDefaultEnemyProperties(spriteType);
        for (let i = 0; i < count; i++) {
          waveEnemies.push({
            id: `${spriteType}-wave${waveIndex}-${i + 1}`,
            sprite: spriteType,
            spawnTime: i * spawnIntervals + spawnDelay,
            hp: defaultHP,
            hitbox: { ...defaultHitbox },
          });
        }
      }
  
      setEnemies((prevEnemies) => prevEnemies.concat(waveEnemies));
      waveIndex++;
  
      const timeoutId = setTimeout(() => spawnWave(setEnemies), spawnDelay);
      timeoutIds.push(timeoutId);
    };
  
    return { spawnWave, timeoutIds };
  };
  