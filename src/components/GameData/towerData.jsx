import { BalloonGunner, BalloonBomber } from "../GameEntity/Defenders.jsx";
import { towerImages } from "../../assets/imageSource.jsx";

const towerT1 = {
  id: "T1",
  name: "Balloon Gunner",
  component: BalloonGunner,
  description: "A basic tower that targets enemies from a distance.",
  cost: 100,
  range: 150,
  damage: 10,
  fireRate: 1.0,
  image: towerImages.balloonGunner,
  sprite: "balloonGunner",
  gridHighlight: { cols: 2, rows: 2 },
};

const towerT2 = {
  id: "T2",
  name: "Balloon Bomber",
  component: BalloonBomber,
  description: "A tower that deals explosive damage to clusters of enemies.",
  cost: 200,
  range: 130,
  damage: 20,
  fireRate: 0.8,
  image: towerImages.Cannon,
  sprite: "balloonBomber",
  gridHighlight: { cols: 2, rows: 2 },
};

const towerT1u = {
  ...towerT1,
  id: "T1u",
  name: "Upgraded Balloon Gunner",
  description: "An upgraded version of the Balloon Gunner with improved stats.",
  cost: 150,
  range: 170,
  damage: 15,
  fireRate: 1.2,
  image: towerImages.balloonGunner, // placeholder for upgraded image
  sprite: "balloonGunner",
  gridHighlight: { cols: 2, rows: 2 },
};

export const towerData = {
  T1: towerT1,
  T2: towerT2,
  T3: towerT1u,
};
