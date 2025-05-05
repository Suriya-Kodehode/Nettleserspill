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
    return `${base}${folderPath}/${fileName}`;
};

export const enemyImages = {
    monkey: paths("enemy", "MonkeyAni.gif"),
};

export const mapImages = {
    newDawn: paths("maps", "New%20Dawn.png"),
}

export const iconImages = {
    heart: paths("icons", "mdi_heart.svg"),
}