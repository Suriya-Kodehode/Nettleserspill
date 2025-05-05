import { EnemyImages } from "../../assets/imageSource.jsx"

export const enemiesData = {
    monkey: {
        src: EnemyImages.monkey,
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