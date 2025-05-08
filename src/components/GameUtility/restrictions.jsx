
export const getRestrictedCells = (mapName, placementRules, routes) => {
  const allRestricted = new Set();
  if (placementRules[mapName]) {
    Object.keys(placementRules[mapName].restrictPositions).forEach((key) => {
      allRestricted.add(key);
    });
  }
  routes.forEach((route) => {
    Object.keys(route.cells).forEach((key) => {
      allRestricted.add(key);
    });
  });
  return Array.from(allRestricted);
};
