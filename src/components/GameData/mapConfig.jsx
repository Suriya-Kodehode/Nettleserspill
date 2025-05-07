import { mapImages } from "../../assets/imageSource.jsx";
import { wavesForNewDawn } from "./waveConfig.jsx";

export const mapConfigs = {
  newDawn: {
    mapSrc: mapImages.newDawn,
    width: 1360,
    height: 600,
    offsetX: -16,
    offsetY: -32,
    enemySpawnGap: 3000,
    waves: wavesForNewDawn,
    spawnDelay: 1000,
    maxRandomDelay: 200,
    maxSpriteSeparation: 10,
    defaultLane: 0,
    centerLane: 1,
    waveInterval: 20000,
  },
};
