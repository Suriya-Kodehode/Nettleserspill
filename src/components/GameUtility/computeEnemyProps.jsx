
export function computeEnemyDrawProps(cycleTime, enemyPath, offsetX, offsetY) {
    const enemyPathLength = enemyPath.length;
    const startKeyframe = enemyPath[0];
    const endKeyframe = enemyPath[enemyPathLength - 1];
    let prevKey = startKeyframe;
    let nextKey = endKeyframe;
    
    for (let j = 0; j < enemyPathLength - 1; j++) {
      const keyA = enemyPath[j];
      const keyB = enemyPath[j + 1];
      if (cycleTime >= keyA.time && cycleTime <= keyB.time) {
        prevKey = keyA;
        nextKey = keyB;
        break;
      }
    }
    
    const segmentDuration = nextKey.time - prevKey.time;
    const progress = segmentDuration !== 0 ? (cycleTime - prevKey.time) / segmentDuration : 0;
    const posX = prevKey.x + (nextKey.x - prevKey.x) * progress;
    const posY = prevKey.y + (nextKey.y - prevKey.y) * progress;
    const opacity = prevKey.opacity + (nextKey.opacity - prevKey.opacity) * progress;
    const finalX = posX + offsetX;
    const finalY = posY + offsetY;
    
    return { finalX, finalY, opacity };
  }
  