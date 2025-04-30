import restrictedRegions from "../GameData/restrictedRegions.jsx";
import { generateBoundingBox, generateLineCells } from "../Functions/gridUtils.jsx";

// For each cell in cellsObj, add the given name to restrictPositions.
const addCells = (cellsObj, name, restrictPositions) => {
  for (let cell in cellsObj) {
    if (!restrictPositions[cell]) {
      restrictPositions[cell] = [];
    }
    restrictPositions[cell].push(name);
  }
};

export const placementRules = Object.entries(restrictedRegions).reduce(
  (rules, [mapName, regionData]) => {
    const restrictPositions = {};

    // Process global boundingBoxes
    if (regionData.boundingBoxes && Array.isArray(regionData.boundingBoxes)) {
      regionData.boundingBoxes.forEach(box => {
        if (box.vertices) {
          const boxCells = generateBoundingBox(box.vertices);
          addCells(boxCells, box.name, restrictPositions);
        } else if (box.segments && Array.isArray(box.segments)) {
          box.segments.forEach(segment => {
            const segCells = generateBoundingBox(segment.vertices);
            addCells(segCells, segment.name, restrictPositions);
          });
        }
      });
    }

    // Process waterAreas
    if (regionData.waterAreas) {
      Object.values(regionData.waterAreas).forEach(waterArea => {
        if (waterArea.boundingBoxes && Array.isArray(waterArea.boundingBoxes)) {
          waterArea.boundingBoxes.forEach(box => {
            if (box.vertices) {
              const boxCells = generateBoundingBox(box.vertices);
              addCells(boxCells, box.name, restrictPositions);
            } else if (box.segments && Array.isArray(box.segments)) {
              box.segments.forEach(segment => {
                const segCells = generateBoundingBox(segment.vertices);
                addCells(segCells, segment.name, restrictPositions);
              });
            }
          });
        }
        if (waterArea.lines && Array.isArray(waterArea.lines)) {
          waterArea.lines.forEach(line => {
            const lineCells = generateLineCells(line.start, line.end);
            lineCells.forEach(cell => {
              if (!restrictPositions[cell]) {
                restrictPositions[cell] = [];
              }
              restrictPositions[cell].push(line.name);
            });
          });
        }
      });
    }

    // Process treesAreas
    if (regionData.treesAreas) {
      Object.values(regionData.treesAreas).forEach(treesArea => {
        if (treesArea.boundingBoxes && Array.isArray(treesArea.boundingBoxes)) {
          treesArea.boundingBoxes.forEach(box => {
            if (box.vertices) {
              const boxCells = generateBoundingBox(box.vertices);
              addCells(boxCells, box.name, restrictPositions);
            } else if (box.segments && Array.isArray(box.segments)) {
              box.segments.forEach(segment => {
                const segCells = generateBoundingBox(segment.vertices);
                addCells(segCells, segment.name, restrictPositions);
              });
            }
          });
        }
        if (treesArea.lines && Array.isArray(treesArea.lines)) {
          treesArea.lines.forEach(line => {
            const lineCells = generateLineCells(line.start, line.end);
            lineCells.forEach(cell => {
              if (!restrictPositions[cell]) {
                restrictPositions[cell] = [];
              }
              restrictPositions[cell].push(line.name);
            });
          });
        }
      });
    }

    // Process global lines
    if (regionData.lines && Array.isArray(regionData.lines)) {
      regionData.lines.forEach(line => {
        const lineCells = generateLineCells(line.start, line.end);
        lineCells.forEach(cell => {
          if (!restrictPositions[cell]) {
            restrictPositions[cell] = [];
          }
          restrictPositions[cell].push(line.name);
        });
      });
    }

    rules[mapName] = { restrictPositions };
    return rules;
  },
  {}
);

export const isPlacementAllowed = (mapName, col, row) => {
  const mapRule = placementRules[mapName];
  const key = `${col},${row}`;
  return !(mapRule.restrictPositions[key] && mapRule.restrictPositions[key].length > 0);
};

export const enemyRoutes = Object.entries(restrictedRegions).reduce(
  (routes, [mapName, regionData]) => {
    if (regionData.enemyRoutes && Array.isArray(regionData.enemyRoutes)) {
      routes[mapName] = regionData.enemyRoutes.map(route => ({
        name: route.name,
        cells: generateBoundingBox(route.vertices),
        vertices: route.vertices,
      }));
    }
    return routes;
  },
  {}
);

// checkPlacement: Aggregates names of enemy routes and regions affecting the cell,
// then logs the complete result.
export const checkPlacement = (mapName, col, row) => {
  const key = `${col},${row}`;
  const allowed = isPlacementAllowed(mapName, col, row);

  // Get enemy route names covering this cell.
  const routesForCell = (enemyRoutes[mapName] || [])
    .filter(route => route.cells[key])
    .map(route => route.name);
  // Get names of restrictions for this cell.
  const restrictions = placementRules[mapName].restrictPositions[key] || [];
  // Merge names uniquely.
  const allNames = [...new Set([...routesForCell, ...restrictions])];

  if (allNames.length === 0) {
    console.log(`Allowed placement at (${col}, ${row}).`);
  } else {
    console.warn(
      `Placement disallowed at (${col}, ${row}) due to: [${allNames.join(", ")}].`
    );
  }
};
