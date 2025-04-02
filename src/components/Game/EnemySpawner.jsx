import { useEffect } from "react";
import { BasicEnemy, SwarmEnemy, SpeedEnemy, TankEnemy, FlyingEnemy } from "../GameEntities/Enemy.jsx";
import PathData from "../../GameData/PathData.jsx";

const EnemySpawner = ({ currentStage, currentWave, setEnemies, setCoins}) => {
    useEffect(() => {
        const stageData = PathData.find((stage) => stage.stage === currentStage);
        if (!stageData || !stageData.path || stageData.path.length === 0) return;

        const path = stageData.path;

        let enemiesToSpawn = [];

        if (currentStage <= 5) {
            enemiesToSpawn.push(BasicEnemy);
        } else if (currentStage <= 10) {
            enemiesToSpawn.push(BasicEnemy, SwarmEnemy);
        } else if (currentStage <= 15) {
            enemiesToSpawn.push(BasicEnemy, SwarmEnemy, SpeedEnemy);
        } else if (currentStage <= 18) {
            enemiesToSpawn.push(BasicEnemy, SwarmEnemy, SpeedEnemy, TankEnemy);
        } else {
            enemiesToSpawn.push(BasicEnemy, SwarmEnemy, SpeedEnemy, TankEnemy, FlyingEnemy);
        }

        let enemyIndex = 0;
        const maxEnemies = 5 + currentWave * 2; 

        const spawnEnemy = () => {
            if (enemyIndex >= maxEnemies) return;

            const EnemyType = enemiesToSpawn[Math.floor(Math.random() * enemiesToSpawn.length)];
            const startX = path[0]?.x ?? 0;
            const startY = path[0]?.y ?? 0;
            const enemy = new EnemyType(startX, startY, path, setEnemies, setCoins);
            setEnemies((prevEnemies) => [...prevEnemies, enemy]);

            enemyIndex++;

            setTimeout(spawnEnemy, Math.random() * 400 + 800);
        };

        spawnEnemy();
    }, [currentStage, currentWave, setEnemies, setCoins]);

    return null;
};

export default EnemySpawner;
