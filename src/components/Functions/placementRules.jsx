import restrictedRegions from "../GameData/restrictedRegions.jsx";
import { generateBoundingBox, generateLineCells } from "../Functions/gridUtils.jsx";

export const placementRules = Object.entries(restrictedRegions).reduce(
  (rules, [mapName, regionData]) => {
    const restrictPositions = {};

    // Process global boundingBoxes
    if (regionData.boundingBoxes && Array.isArray(regionData.boundingBoxes)) {
      regionData.boundingBoxes.forEach((box) => {
        if (box.vertices) {
          Object.assign(restrictPositions, generateBoundingBox(box.vertices));
        } else if (box.segments && Array.isArray(box.segments)) {
          box.segments.forEach((segment) => {
            Object.assign(restrictPositions, generateBoundingBox(segment.vertices));
          });
        }
      });
    }

    // Process waterAreas
    if (regionData.waterAreas) {
      Object.values(regionData.waterAreas).forEach((waterArea) => {
        if (waterArea.boundingBoxes && Array.isArray(waterArea.boundingBoxes)) {
          waterArea.boundingBoxes.forEach((box) => {
            if (box.vertices) {
              Object.assign(restrictPositions, generateBoundingBox(box.vertices));
            } else if (box.segments && Array.isArray(box.segments)) {
              box.segments.forEach((segment) => {
                Object.assign(restrictPositions, generateBoundingBox(segment.vertices));
              });
            }
          });
        }
        if (waterArea.lines && Array.isArray(waterArea.lines)) {
          waterArea.lines.forEach((line) => {
            generateLineCells(line.start, line.end).forEach(
              (cell) => (restrictPositions[cell] = true)
            );
          });
        }
      });
    }

    // Process treesAreas
    if (regionData.treesAreas) {
      Object.values(regionData.treesAreas).forEach((treesArea) => {
        if (treesArea.boundingBoxes && Array.isArray(treesArea.boundingBoxes)) {
          treesArea.boundingBoxes.forEach((box) => {
            if (box.vertices) {
              Object.assign(restrictPositions, generateBoundingBox(box.vertices));
            } else if (box.segments && Array.isArray(box.segments)) {
              box.segments.forEach((segment) => {
                Object.assign(restrictPositions, generateBoundingBox(segment.vertices));
              });
            }
          });
        }
        if (treesArea.lines && Array.isArray(treesArea.lines)) {
          treesArea.lines.forEach((line) => {
            generateLineCells(line.start, line.end).forEach(
              (cell) => (restrictPositions[cell] = true)
            );
          });
        }
      });
    }

    // Process global lines
    if (regionData.lines && Array.isArray(regionData.lines)) {
      regionData.lines.forEach((line) => {
        generateLineCells(line.start, line.end).forEach(
          (cell) => (restrictPositions[cell] = true)
        );
      });
    }

    rules[mapName] = { restrictPositions };
    return rules;
  },
  {}
);

export const isPlacementAllowed = (mapName, col, row) => {
  const mapRule = placementRules[mapName];
  return mapRule ? !mapRule.restrictPositions[`${col},${row}`] : true;
};

export const enemyRoutes = Object.entries(restrictedRegions).reduce(
  (routes, [mapName, regionData]) => {
    if (regionData.enemyRoutes && Array.isArray(regionData.enemyRoutes)) {
      routes[mapName] = regionData.enemyRoutes.map((route) => ({
        name: route.name,
        cells: generateBoundingBox(route.vertices),
        vertices: route.vertices,
      }));
    }
    return routes;
  },
  {}
);

// Logs and returns placement results for a given cell.
export const checkPlacement = (mapName, col, row) => {
  const key = `${col},${row}`;
  const normalAllowed = isPlacementAllowed(mapName, col, row);
  const routes = enemyRoutes[mapName] || [];
  const inEnemyRoute = routes.some((route) => route.cells[key]);
  
  if (normalAllowed && !inEnemyRoute) {
    console.log(`Allowed placement at (${col}, ${row}).`);
  } else if (inEnemyRoute) {
    console.log(`Enemy route at (${col}, ${row}). Placement not allowed.`);
  } else {
    console.warn(`Placement disallowed at (${col}, ${row}).`);
  }
};
