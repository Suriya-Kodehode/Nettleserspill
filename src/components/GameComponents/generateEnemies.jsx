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

  return enemy;
}
