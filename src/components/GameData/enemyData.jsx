import { enemyImages } from "../../assets/imageSource.jsx";

// --------------------------------------------------
const createOutline = (m, sX, sY, c, lw, a) => ({ 
    margin: m, 
    shiftX: sX, 
    shiftY: sY, 
    color: c, 
    lineWidth: lw, 
    alpha: a 
});
// Helper function creates an outline object.
// Parameters:
//   m   - margin: additional size (in pixels) added to the default hitbox for the outline.
//   sX  - shiftX: horizontal offset to adjust (move) the outline from the centered position.
//   sY  - shiftY: vertical offset to adjust (move) the outline from the centered position.
//   c   - color: the color used for the outline.
//   lw  - lineWidth: thickness of the outline line.
//   a   - alpha: opacity for the outline (0 to 1).
// --------------------------------------------------

export const enemiesData = {
  monkey: {
    name: "Monkey",
    src: enemyImages.monkey,
    width: 32,
    height: 32,
    defaultHP: 100,
    damage: 5,
    defaultHitbox: { x: 0, y: 0, width: 25, height: 32 },
    outline: createOutline(5, 0, 0, "red", 3, 0.7),
  },
  boss: {
    name: "Boss",
    src: enemyImages.boss,
    width: 64,
    height: 64,
    defaultHP: 500,
    damage: 10,
    defaultHitbox: { x: 0, y: 0, width: 50, height: 64 },
    outline: createOutline(10, 16, 32, "gold", 5, 0.7),
  },
};
