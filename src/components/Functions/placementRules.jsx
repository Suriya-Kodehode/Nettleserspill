import restrictedRegions from "../GameData/restrictedRegions.jsx";
import { generateBoundingBox, generateLineCells } from "../Functions/gridUtils.jsx";

export const placementRules = Object.entries(restrictedRegions).reduce(
  (rules, [mapName, regionData]) => {
    const restrictPositions = {};

    // Process global boundingBoxes
    if (regionData.boundingBoxes && Array.isArray(regionData.boundingBoxes)) {
      regionData.boundingBoxes.forEach((box) => {
        if (box.vertices) {
          const boxCells = generateBoundingBox(box.vertices);
          Object.assign(restrictPositions, boxCells);
        } else if (box.segments && Array.isArray(box.segments)) {
          box.segments.forEach((segment) => {
            const segCells = generateBoundingBox(segment.vertices);
            Object.assign(restrictPositions, segCells);
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
              const boxCells = generateBoundingBox(box.vertices);
              Object.assign(restrictPositions, boxCells);
            } else if (box.segments && Array.isArray(box.segments)) {
              box.segments.forEach((segment) => {
                const segCells = generateBoundingBox(segment.vertices);
                Object.assign(restrictPositions, segCells);
              });
            }
          });
        }
        if (waterArea.lines && Array.isArray(waterArea.lines)) {
          waterArea.lines.forEach((line) => {
            const lineCells = generateLineCells(line.start, line.end);
            lineCells.forEach((cell) => (restrictPositions[cell] = true));
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
              const boxCells = generateBoundingBox(box.vertices);
              Object.assign(restrictPositions, boxCells);
            } else if (box.segments && Array.isArray(box.segments)) {
              box.segments.forEach((segment) => {
                const segCells = generateBoundingBox(segment.vertices);
                Object.assign(restrictPositions, segCells);
              });
            }
          });
        }
        if (treesArea.lines && Array.isArray(treesArea.lines)) {
          treesArea.lines.forEach((line) => {
            const lineCells = generateLineCells(line.start, line.end);
            lineCells.forEach((cell) => (restrictPositions[cell] = true));
          });
        }
      });
    }

    // Process global lines
    if (regionData.lines && Array.isArray(regionData.lines)) {
      regionData.lines.forEach((line) => {
        const lineCells = generateLineCells(line.start, line.end);
        lineCells.forEach((cell) => (restrictPositions[cell] = true));
      });
    }

    rules[mapName] = { restrictPositions };
    return rules;
  },
  {}
);

export const isPlacementAllowed = (mapName, col, row) => {
  const mapRule = placementRules[mapName];
  if (!mapRule) return true;
  const key = `${col},${row}`;
  return !mapRule.restrictPositions[key];
};

export const enemyRoutes = Object.entries(restrictedRegions).reduce(
  (routes, [mapName, regionData]) => {
    if (regionData.enemyRoutes && Array.isArray(regionData.enemyRoutes)) {
      const processedRoutes = regionData.enemyRoutes.map((route) => ({
        name: route.name,
        cells: generateBoundingBox(route.vertices),
        vertices: route.vertices,
      }));
      routes[mapName] = processedRoutes;
    }
    return routes;
  },
  {}
);
