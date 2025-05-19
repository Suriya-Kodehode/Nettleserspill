import { base_url as base } from "../../config.js";

const imagePath = {
  background: "/images/background",
  enemy: "/images/enemy",
  maps: "/images/maps",
  icons: "/images/icons",
  tower: "/images/tower",
};

const path = (folderKey, fileName) => {
  const folderPath = imagePath[folderKey];
  if (!folderPath) {
    console.error(`Invalid folder key: ${folderKey}`);
    return "";
  }
  const encodedFileName = encodeURI(fileName);
  return `${base}${folderPath}/${encodedFileName}`;
};

export const backgroundImages = {
  balloonVsMonkey: path("background", "Balloon vs monkey.svg"),
  cursed: path("background", "Cursed.svg"),
};

export const enemyImages = {
  monkey: path("enemy", "MonkeyAni.gif"),
  boss: path("enemy", "BossMan.gif"),
  cat: path("enemy", "cat.gif"),
};

export const iconImages = {
  heart: path("icons", "mdi_heart.svg"),
  playButton: path("icons", "play button.svg"),
  redBalloon: path("icons", "Red balloon.svg"),
  moveIcon: path("icons", "moveIcon.svg"),
  upgradeIcon: path("icons", "upgradeIcon.svg"),
};

export const mapImages = {
  newDawn: path("maps", "New Dawn.png"),
  bigMap: path("maps", "BigMap.png"),
  dirt: path("maps", "Dirt.png"),
  easyMap: path("maps", "EasyMap.png"),
  map: path("maps", "map.png"),
  ThePath: path("maps", "ThePath.png"),
};

export const towerImages = {
  balloonGunner: path("tower", "BalloonGunner.gif"),
  Cannon: path("tower", "Cannon.gif"),
};