
export const generateBoundingBox = (vertices) => {
  const restrictPositions = {};

  let minCol = Infinity,
    maxCol = -Infinity;
  let minRow = Infinity,
    maxRow = -Infinity;

  for (const [col, row] of vertices) {
    if (col < minCol) minCol = col;
    if (col > maxCol) maxCol = col;
    if (row < minRow) minRow = row;
    if (row > maxRow) maxRow = row;
  }

  for (let col = minCol; col <= maxCol; col++) {
    for (let row = minRow; row <= maxRow; row++) {
      restrictPositions[`${col},${row}`] = true;
    }
  }

  return restrictPositions;
};

export const isPointInPolygon = (x, y, vertices) => {
  let inside = false;
  for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
    const [xi, yi] = vertices[i];
    const [xj, yj] = vertices[j];

    const intersect =
      yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
};

export const generateLineCells = (start, end) => {
  const [x1, y1] = start;
  const [x2, y2] = end;

  const cells = [];
  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);
  const sx = x1 < x2 ? 1 : -1;
  const sy = y1 < y2 ? 1 : -1;
  let err = dx - dy;

  let x = x1;
  let y = y1;

  while (true) {
    cells.push(`${x},${y}`);
    if (x === x2 && y === y2) break;

    const e2 = err * 2;
    if (e2 > -dy) {
      err -= dy;
      x += sx;
    }
    if (e2 < dx) {
      err += dx;
      y += sy;
    }
  }

  return cells;
};
