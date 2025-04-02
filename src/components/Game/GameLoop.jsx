import { useEffect } from "react";

export const GameLoop = ({ enemies, bullets, towers, setEnemies, setBullets, setPlayerHP }) => {
    useEffect(() => {
        const interval = setInterval(() => {
            enemies.forEach((enemy) => {
                enemy.move();
            });

            setBullets((prevBullets) => prevBullets.filter((bullet) => !bullet.move()));
        }, 1000/60)

        return () => clearInterval(interval);
    }, [enemies, bullets, towers, setEnemies, setBullets, setPlayerHP]);
    
    return null;
};

export default GameLoop;