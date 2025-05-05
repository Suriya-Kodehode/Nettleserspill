import { base_url as base } from "../../../config"

export const enemiesData = {
    monkey: {
        src: `${base}images/enemy/MonkeyAni.gif`,
        width: 32,
        height: 32,
        defaultHP: 100,
        damage: 5,
        defaultHitbox: {
            x: 0,
            y: 0,
            width: 25,
            height: 32,
        }
    }
}