import { base_url as base } from "../../config.js";

const url = {
    background: "/images/background",
    enemy: "/images/enemy",
    maps: "/images/maps",
    icons: "/images/icons",
    tower: "/images/tower",
}

const paths = (folderKey, fileName) => {
    const folderPath = url[folderKey];
    if (!folderPath) {
        console.error(`Invalid folder key: ${folderKey}`);
        return "";
    }
    const encodedFileName = encodeURI(fileName);
    return `${base}${folderPath}/${encodedFileName}`;
};

export const enemyImages = {
    monkey: paths("enemy", "MonkeyAni.gif"),
    boss: paths("enemy", "Boss.png"),
    cat: paths("enemy", "cat.gif"),
};

export const mapImages = {
    newDawn: paths("maps", "New Dawn.png"),
    bigMap: paths("maps", "BigMap.png"),
    dirt: paths("maps", "Dirt.png"),
    easyMap: paths("maps", "EasyMap.png"),
    map: paths("maps", "map.png"),
    ThePath: paths("maps", "ThePath.png"),
}

export const iconImages = {
    heart: paths("icons", "mdi_heart.svg"),
    playButton: paths("icons", "play button.svg"),
    redBalloon: paths("icons", "Red balloon.svg"),
}

export const towerImages = {
    balloonGunner: paths("tower", "BalloonGunner.gif"),
}