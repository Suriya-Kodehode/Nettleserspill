import { base_url as base } from "../../../config"
import { wavesForNewDawn } from "./waveConfig.jsx";

export const mapConfigs = {
  newDawn: {
    mapSrc: `${base}/images/map/NewDawn.png`,
    width: 1360,
    height: 600,
    offsetX: -16,
    offsetY: -32,
    enemySpawnGap: 3000,
    spriteCount: { monkey: 1 },
    waves: wavesForNewDawn,
    waveCount: wavesForNewDawn.length,
    spawnDelay: 1000,
    maxRandomDelay: 200,
    maxSpriteSeparation: 10,
    defaultLane: 0,
    waveInterval: 20000,
  },
};



