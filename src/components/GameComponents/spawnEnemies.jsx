import { generateEnemy } from "./generateEnemies.jsx";

export const spawnEnemies = (config) => {
  // console.log("spawnEnemies called with config:", config);

  const {
    spawnDelay,
    waves,
    enemySpawnGap = 3000, 
    maxRandomDelay = 200,
    maxSpriteSeparation = 10,
    waveInterval = 2000,
  } = config;

  if (!waves || waves.length === 0) {
    console.error("No waves defined in the configuration:", waves);
    return { spawnWave: () => {}, timeoutIds: [] };
  }
  // console.log("Waves defined:", waves);

  const timeoutIds = [];
  let waveIndex = 0;

  const spawnWave = (setEnemies) => {
    if (waveIndex >= waves.length) {
      console.log("All waves have spawned. No further enemy spawns.");
      return;
    }
    
    console.log(`Spawning wave ${waveIndex + 1} of ${waves.length}`);

    const currentWave = waves[waveIndex];
    let maxWaveDelay = 0;

    if (currentWave.enemies) {
      Object.entries(currentWave.enemies).forEach(([spriteType, count]) => {
        // console.log(`Wave ${waveIndex}: Spawning ${count} regular enemy(ies) of type "${spriteType}"`);
        for (let i = 0; i < count; i++) {
          const randomDelay = Math.random() * maxRandomDelay;
          const precomputedDelay = spawnDelay + i * enemySpawnGap + randomDelay;
          if (precomputedDelay > maxWaveDelay) maxWaveDelay = precomputedDelay;
          
          const spriteOffset =
            Math.random() * maxSpriteSeparation - maxSpriteSeparation / 2;
          
          const enemy = generateEnemy(spriteType, waveIndex, i, config, randomDelay, spriteOffset);
          // console.log("Generated enemy:", enemy);
          
          const timeoutId = setTimeout(() => {
            const actualSpawnTime = performance.now();
            // console.log(`Spawning enemy: ${enemy.id} at ${actualSpawnTime}`);
            setEnemies((prevEnemies) => [
              ...prevEnemies,
              { ...enemy, spawnTime: actualSpawnTime },
            ]);
          }, precomputedDelay);
          timeoutIds.push(timeoutId);
        }
      });
    }

    if (currentWave.boss && currentWave.boss.spawn) {
      const bossCount = currentWave.boss.count || 1;
      // console.log(`Wave ${waveIndex}: Spawning ${bossCount} boss enemy(ies)`);
      for (let i = 0; i < bossCount; i++) {
        const randomDelay = Math.random() * maxRandomDelay;
        const precomputedDelay = spawnDelay + randomDelay;
        if (precomputedDelay > maxWaveDelay) maxWaveDelay = precomputedDelay;
        
        const spriteOffset =
          Math.random() * maxSpriteSeparation - maxSpriteSeparation / 2;
        
        const enemy = generateEnemy("boss", waveIndex, i, config, randomDelay, spriteOffset);
        // console.log("Generated boss enemy:", enemy);
        
        const timeoutId = setTimeout(() => {
          const actualSpawnTime = performance.now();
          // console.log(`Spawning boss: ${enemy.id} at ${actualSpawnTime}`);
          setEnemies((prevEnemies) => [
            ...prevEnemies,
            { ...enemy, spawnTime: actualSpawnTime },
          ]);
        }, precomputedDelay);
        timeoutIds.push(timeoutId);
      }
    }

    waveIndex++;
    if (waveIndex < waves.length) {
      const nextWaveDelay = maxWaveDelay + waveInterval;
      // console.log(`Scheduling next wave (#${waveIndex + 1}) in ${nextWaveDelay} ms`);
      const timeoutId = setTimeout(() => spawnWave(setEnemies), nextWaveDelay);
      timeoutIds.push(timeoutId);
    }
  };

  return { spawnWave, timeoutIds };
};
