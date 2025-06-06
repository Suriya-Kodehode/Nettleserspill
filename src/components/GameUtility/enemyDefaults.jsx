import { enemiesData } from "../GameData/enemyData.jsx";

export const getDefaultEnemyProperties = (spriteType) => {
  const spriteData = enemiesData[spriteType];
  if (!spriteData) {
    throw new Error(`Sprite type "${spriteType}" not found.`);
  }
  return {
    hp: spriteData.defaultHP || 100,
    hitbox:
      { ...spriteData.defaultHitbox } ||
      { x: 0, y: 0, width: spriteData.width, height: spriteData.height },
    damage: spriteData.damage || 0,
  };
};
