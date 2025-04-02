import { useState, useEffect } from 'react';

import EnemySpawner from '../Game/EnemySpawner.jsx';
import PathData from '../../GameData/PathData.jsx';

import styles from '../../CSSModules/GameStage.module.css';

const GameStage = ({ currentStage, setEnemies, setCoins, enemies }) => {
    const [path, setPath] = useState([]);

    useEffect(() => {
        const stageData = PathData.find((stage) => stage.stage === currentStage);
        if (stageData) {
            setPath(stageData.path);
        } 
    }, [currentStage]);

    return (
        <>
            <div className={styles.gameStageContainer}>
                <h2>Stage {currentStage}</h2>
                <div className={styles.pathVisual}>
                    {path.length > 0 && (
                        <svg width="100%" height="500px">
                            <polyline
                                points={path.map((point) => point.join(',')).join(' ')}
                                fill='none'
                                stroke='black'
                                strokeWidth='2'
                            />
                        </svg>
                    )}
                </div>
                <EnemySpawner currentStage={currentStage} setEnemies={setEnemies} setCoins={setCoins}/>
                <div className={styles.enemies}>
                    {enemies.map((enemy, index) => (
                        <div key={index} className={styles.enemy}>
                            <span>{enemy.constructor.name} - Health: {enemy.health}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default GameStage;