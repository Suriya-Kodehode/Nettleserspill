import restrictedRegions from "../GameData/restrictedRegions.jsx";
import { generateBoundingBox, generateLineCells } from "../Functions/GridTool/gridUtils.jsx";

// For each cell in cellsObj, add the given name to restrictPositions.
const addCells = (cellsObj, name, restrictPositions) => {
  for (let cell in cellsObj) {
    if (!restrictPositions[cell]) {
      restrictPositions[cell] = [];
    }
    restrictPositions[cell].push(name);
  }
};

export const placementRules = Object.entries(restrictedRegions).reduce((rules, [mapName, regionData]) => {
  const restrictPositions = {};

  // Process global boundingBoxes.
  if (Array.isArray(regionData.boundingBoxes)) {
    regionData.boundingBoxes.forEach(box => {
      if (box.vertices) {
        addCells(generateBoundingBox(box.vertices), box.name, restrictPositions);
      } else if (Array.isArray(box.segments)) {
        box.segments.forEach(segment =>
          addCells(generateBoundingBox(segment.vertices), segment.name, restrictPositions)
        );
      }
    });
  }

  // Process waterAreas.
  if (regionData.waterAreas) {
    Object.entries(regionData.waterAreas).forEach(([waterAreaKey, waterArea]) => {
      const prefix = `${waterAreaKey}: `;
      if (Array.isArray(waterArea.boundingBoxes)) {
        waterArea.boundingBoxes.forEach(box => {
          if (box.vertices) {
            addCells(generateBoundingBox(box.vertices), prefix + box.name, restrictPositions);
          } else if (Array.isArray(box.segments)) {
            box.segments.forEach(segment =>
              addCells(generateBoundingBox(segment.vertices), prefix + segment.name, restrictPositions)
            );
          }
        });
      }
      if (Array.isArray(waterArea.lines)) {
        waterArea.lines.forEach(line => {
          generateLineCells(line.start, line.end).forEach(cell => {
            if (!restrictPositions[cell]) restrictPositions[cell] = [];
            restrictPositions[cell].push(prefix + line.name);
          });
        });
      }
    });
  }

  // Process treesAreas.
  if (regionData.treesAreas) {
    Object.values(regionData.treesAreas).forEach(treesArea => {
      if (Array.isArray(treesArea.boundingBoxes)) {
        treesArea.boundingBoxes.forEach(box => {
          if (box.vertices) {
            addCells(generateBoundingBox(box.vertices), box.name, restrictPositions);
          } else if (Array.isArray(box.segments)) {
            box.segments.forEach(segment =>
              addCells(generateBoundingBox(segment.vertices), segment.name, restrictPositions)
            );
          }
        });
      }
      if (Array.isArray(treesArea.lines)) {
        treesArea.lines.forEach(line => {
          generateLineCells(line.start, line.end).forEach(cell => {
            if (!restrictPositions[cell]) restrictPositions[cell] = [];
            restrictPositions[cell].push(line.name);
          });
        });
      }
    });
  }

  // Process global lines.
  if (Array.isArray(regionData.lines)) {
    regionData.lines.forEach(line => {
      generateLineCells(line.start, line.end).forEach(cell => {
        if (!restrictPositions[cell]) restrictPositions[cell] = [];
        restrictPositions[cell].push(line.name);
      });
    });
  }

  rules[mapName] = { restrictPositions };
  return rules;
}, {});

export const isPlacementAllowed = (mapName, col, row) => {
  const mapRule = placementRules[mapName];
  const key = `${col},${row}`;
  return !(mapRule.restrictPositions[key] && mapRule.restrictPositions[key].length > 0);
};

export const enemyRoutes = Object.entries(restrictedRegions).reduce((routes, [mapName, regionData]) => {
  if (Array.isArray(regionData.enemyRoutes)) {
    routes[mapName] = regionData.enemyRoutes.map(route => ({
      name: route.name,
      cells: generateBoundingBox(route.vertices),
      vertices: route.vertices,
    }));
  }
  return routes;
}, {});

export const checkPlacement = (mapName, col, row) => {
  const key = `${col},${row}`;
  // Get enemy route names covering this cell.
  const routesForCell = (enemyRoutes[mapName] || [])
    .filter(route => route.cells[key])
    .map(route => route.name);
  // Get names of restrictions for this cell.
  const restrictions = placementRules[mapName].restrictPositions[key] || [];
  const allNames = [...new Set([...routesForCell, ...restrictions])];

  if (allNames.length === 0) {
    console.log(`Allowed placement at (${col}, ${row}).`);
  } else {
    console.warn(`Placement disallowed at (${col}, ${row}) due to: [${allNames.join(", ")}].`);
  }
};
