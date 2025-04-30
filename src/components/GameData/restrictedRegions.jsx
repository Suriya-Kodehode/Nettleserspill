const restrictedRegions = {
  newDawn: {
    boundingBoxes: [
      { name: "Southwest forest 1", vertices: [[0,29],[7,29],[7,31],[0,31],[0,29]] },
      { name: "Southwest forest 2", vertices: [[0,32],[9,32],[9,37],[0,37],[0,32]] },
      { name: "Northwest mountain", vertices: [[0,0],[16,0],[16,15],[0,15],[0,0]] },
      { name: "Small bump", vertices: [[17,13],[19,13],[19,14],[17,14],[17,13]] },
      { name: "Northern forest 1", vertices: [[30,0],[30,1],[17,1],[18,0],[30,0]] },
      { name: "Northern forest 2", vertices: [[18,2],[27,2],[27,5],[18,5],[18,2]] },
      { name: "Northern forest 3", vertices: [[28,4],[29,4],[29,5],[28,5],[28,4]] },
      { name: "Northern forest stone altar", vertices: [[18,6],[26,6],[26,10],[18,10],[18,6]] },
      { name: "Cliff edge 6", vertices: [[43,3],[44,3],[44,17],[43,17],[43,3]] },
      { name: "Cliff edge 7", vertices: [[35,16],[38,16],[38,17],[35,17],[35,16]] },
      { name: "Cliff edge 8", vertices: [[65,34],[84,34],[84,35],[65,35],[65,34]] },
      { name: "Cliff edge 11", vertices: [[65,6],[66,6],[66,17],[65,17],[65,6]] },
      { name: "Cliff edge 15", vertices: [[70,15],[71,15],[71,17],[70,17],[70,15]] },
      { name: "Cliff edge 16", vertices: [[70,21],[71,21],[71,22],[70,22],[70,21]] }
    ],
    lines: [
      { name: "Cliff edge 1", start: [29,11], end: [20,11] },
      { name: "Cliff edge 2", start: [20,12], end: [20,21] },
      { name: "Cliff edge 3", start: [24,21], end: [38,21] },
      { name: "Cliff edge 4", start: [39,20], end: [39,17] },
      { name: "Cliff edge 5", start: [30,3], end: [30,17] },
      { name: "Cliff edge 9", start: [65,22], end: [65,29] },
      { name: "Cliff edge 10", start: [66,21], end: [66,23] },
      { name: "Cliff edge 12", start: [79,5], end: [66,5] },
      { name: "Cliff edge 13", start: [84,5], end: [84,15] },
      { name: "Cliff edge 14", start: [83,15], end: [71,15] },
      { name: "Cliff edge 17", start: [72,22], end: [84,22] },
      { name: "Cliff edge 18", start: [84,23], end: [84,35] },
      { name: "Cliff edge 19", start: [70,23], end: [70,22] }
    ],
    enemyRoutes: [
      { name: "Enemy Route Segment 1", vertices: [[0,18],[13,18],[13,20],[0,20],[0,18]] },
      { name: "Enemy Route Segment 2", vertices: [[11,21],[13,21],[13,28],[11,28],[11,21]] },
      { name: "Enemy Route Segment 3", vertices: [[14,26],[23,26],[23,28],[14,28],[14,26]] },
      { name: "Enemy Route Segment 4", vertices: [[21,25],[23,25],[23,12],[21,12],[21,25]] },
      { name: "Enemy Route Segment 5", vertices: [[24,12],[29,12],[29,14],[24,14],[24,12]] },
      { name: "Enemy Route Segment 6", vertices: [[26,15],[29,15],[29,20],[26,20],[26,15]] },
      { name: "Enemy Route Segment 7", vertices: [[30,18],[34,18],[34,20],[30,20],[30,18]] },
      { name: "Enemy Route Segment 8", vertices: [[31,17],[34,17],[34,3],[31,3],[31,17]] },
      { name: "Enemy Route Segment 9", vertices: [[35,3],[35,6],[42,6],[42,3],[35,3]] },
      { name: "Enemy Route Segment 10", vertices: [[39,6],[42,6],[42,33],[39,33],[39,6]] },
      { name: "Enemy Route Segment 11", vertices: [[43,31],[43,33],[65,33],[65,31],[43,31]] },
      { name: "Enemy Route Segment 12", vertices: [[65,30],[65,32],[82,32],[82,30],[65,30]] },
      { name: "Enemy Route Segment 13", vertices: [[79,29],[82,29],[82,24],[79,24],[79,29]] },
      { name: "Enemy Route Segment 14", vertices: [[78,24],[78,26],[67,26],[67,24],[78,24]] },
      { name: "Enemy Route Segment 15", vertices: [[67,23],[69,23],[69,14],[67,14],[67,23]] },
      { name: "Enemy Route Segment 16", vertices: [[67,11],[67,14],[83,14],[83,11],[67,11]] },
      { name: "Enemy Route Segment 17", vertices: [[80,10],[83,10],[83,1],[80,1],[80,10]] },
      { name: "Enemy Route Segment 18", vertices: [[79,4],[79,1],[46,1],[46,4],[79,4]] },
      { name: "Enemy Route Segment 19", vertices: [[46,5],[48,5],[48,11],[46,11],[46,5]] },
      { name: "Enemy Route Segment 20", vertices: [[49,8],[49,11],[63,11],[63,8],[49,8]] },
      { name: "Enemy Route Segment 21", vertices: [[60,12],[63,12],[63,20],[60,20],[60,12]] },
      { name: "Enemy Route Segment 22", vertices: [[64,18],[66,18],[66,20],[64,20],[64,18]] },
      { name: "Enemy Route Segment 23", vertices: [[70,18],[84,18],[84,20],[70,20],[70,18]] }
    ],
    waterAreas: {
      "waterArea 1": {
        boundingBoxes: [
          { name: "Segment 1", vertices: [[27,26],[35,26],[35,29],[27,29],[27,26]] },
          { name: "Segment 2", vertices: [[28,22],[28,25],[29,25],[29,22],[28,22]] },
          { name: "Segment 3", vertices: [[35,23],[35,34],[34,24],[34,23],[35,23]] },
          { name: "Segment 4", vertices: [[33,22],[34,22],[34,25],[33,25],[33,22]] },
          { name: "Segment 5", vertices: [[30,23],[32,23],[32,25],[30,25],[30,23]] },
          { name: "Segment 6", vertices: [[28,30],[34,30],[34,37],[28,37],[28,30]] },
          { name: "treeSegment 1", vertices: [[36,33],[37,33],[37,36],[36,36],[36,33]] }
        ],
        lines: [
          { name: "Segment 7", start: [27,31], end: [28,31] },
          { name: "Segment 8", start: [27,33], end: [27,37] },
          { name: "Segment 9", start: [35,35], end: [35,37] },
          { name: "treeSegment 2", start: [38,35], end: [38,36] }
        ]
      },
      "waterArea 2": {
        boundingBoxes: [
          { name: "Segment 1", vertices: [[45,14],[49,14],[49,19],[45,19],[45,14]] },
          { name: "Segment 3", vertices: [[47,21],[54,21],[54,22],[47,22],[47,21]] },
          { name: "Segment 5", vertices: [[56,26],[55,26],[55,22],[56,22],[56,26]] },
          { name: "Segment 6", vertices: [[57,24],[63,24],[63,26],[57,26],[57,24]] },
          { name: "Segment 9", vertices: [[51,16],[52,16],[52,23],[51,23],[51,16]] },
          { name: "Segment 10", vertices: [[53,24],[54,24],[54,25],[53,25],[53,24]] },
        ],
        lines: [
          { name: "Segment 2", start: [46,20], end: [54,20] },
          { name: "Segment 4", start: [50,23], end: [54,23] },
          { name: "Segment 7", start: [57,27], end: [61,27] },
          { name: "Segment 8", start: [50,15], end: [50,23] },
          { name: "Segment 11", start: [53,17], end: [53,19] },
          { name: "Segment 12", start: [54,19], end: [53,19] },
          { name: "Segment 13", start: [59,23], end: [60,23] },
          { name: "Segment 14", start: [64,24], end: [63,24] },
        ]
      },
    },
    treesAreas: {
      trees: {
        boundingBoxes: [
          { name: "trees 1", vertices: [[41,0],[45,0],[45,2],[41,2],[41,0]] },
          { name: "trees 2", vertices: [[55,19],[59,19],[59,20],[55,20],[55,19]] },
          { name: "trees 3", vertices: [[56,21],[57,21],[57,22],[56,22],[56,21]]},
          { name: "trees 5", vertices: [[65,5],[63,5],[63,8],[65,8],[65,5]] },
          { name: "trees 7", vertices: [[67,6],[69,6],[69,7],[67,7],[67,6]] },
        ],
        lines: [
          { name: "trees 4", start: [64,10], end: [64,12] },
          { name: "trees 6", start: [62,6], end: [63,6] },
          { name: "trees 8", start: [67,8], end: [67,7] },
          { name: "trees 9", start: [80,0], end: [81,0] },
          { name: "trees 10", start: [84,0], end: [84,4] },
          { name: "trees 11", start: [83,0], end: [84,0] },
        ]
      }
    }
  }
};

export default restrictedRegions;
