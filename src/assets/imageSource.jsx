import { base_url as base } from "../../config.js";

const url = {
    background: "/images/background",
    enemy: "/images/enemy",
    maps: "/images/maps",
    icons: "/images/icons",
    tower: "/images/tower",
}

const paths = (folderKey, fileName) => `${base}${url[folderKey]}/${fileName}`;

export const EnemyImages = {
    monkey: paths("enemy", "monkey.png"),
};

export const mapImages = {
    newDawn: paths("maps", "New%20Dawn.png"),
}

export const iconImages = {
    heart: paths("icons", "heart.png"),
}