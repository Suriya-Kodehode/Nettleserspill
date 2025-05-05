import { base_url as base } from "../../config.js";

const url = {
    background: "/images/background",
    enemy: "/images/enemy",
    maps: "/images/maps",
    icons: "/images/icons",
    tower: "/images/tower",
}

const path = (folderKey, fileName) => {
    const folderPath = url[folderKey];
    if (!folderPath) {
        console.error(`Invalid folder key: ${folderKey}`);
        return "";
    }
    const encodedFileName = encodeURI(fileName);
    return `${base}${folderPath}/${encodedFileName}`;
};

export const enemyImages = {
    monkey: path("enemy", "MonkeyAni.gif"),
    boss: path("enemy", "Boss.png"),
    cat: path("enemy", "cat.gif"),
};

export const mapImages = {
    newDawn: path("maps", "New Dawn.png"),
    bigMap: path("maps", "BigMap.png"),
    dirt: path("maps", "Dirt.png"),
    easyMap: path("maps", "EasyMap.png"),
    map: path("maps", "map.png"),
    ThePath: path("maps", "ThePath.png"),
}

export const iconImages = {
    heart: path("icons", "mdi_heart.svg"),
    playButton: path("icons", "play button.svg"),
    redBalloon: path("icons", "Red balloon.svg"),
}

export const towerImages = {
    balloonGunner: path("tower", "BalloonGunner.gif"),
}