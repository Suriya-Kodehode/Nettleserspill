
// This file defines tower placement restrictions for various maps.
// By default, if no restrictPositions are specified, all placements are allowed.
// To restrict placements, populate the restrictPositions object with keys that correspond
// to grid cells (formatted as "col,row") where tower placements should NOT be allowed.

export const placementRules = {
 
  newDawn: {
  
    restrictPositions: {
      "0,29": true,
      "1,29": true,
      "2,29": true,
      "3,29": true,
      "4,29": true,
      "5,29": true,
      "6,29": true,
      "7,30": true,
      "8,31": true,
      "9,33": true,
      "8,33": true,
      "8,34": true,
      "8,35": true,
      "7,36": true,
      "7,37": true,
      "6,37": true,
      "5,37": true,
      "4,37": true,
      "3,37": true,
      "2,37": true,
      "1,37": true,
      "0,37": true,
    },
  },
};

// Helper function that returns true if placement is allowed, or false if the cell is restricted.
export const isPlacementAllowed = (mapName, col, row) => {
  const mapRule = placementRules[mapName];
  // If no restrictions are defined, allow placement by default.
  if (!mapRule || !mapRule.restrictPositions) {
    return true;
  }
  const key = `${col},${row}`;
  // If the key is in restrictPositions, placement is disallowed.
  if (mapRule.restrictPositions[key]) {
    return false;
  }
  return true;
};
