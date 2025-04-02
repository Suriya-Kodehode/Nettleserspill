import { useState, useEffect } from 'react';
import { GameLoop } from './GameLoop.jsx'
import { Renderer } from '../UI/Renderer.jsx';
import { GameInteraction } from '../UI/GameInteraction.jsx';
import EnemySpawner from './EnemySpawner.jsx';
import { paths } from '../../GameData/PathData.jsx'

import styles from '../CSSModules/GameController.module.css';

const GameController = () => {

    const [enemies, setEnemies] = useState([]);
    const [bullets, setBullets] = useState([]);
    const [towers, setTowers] = useState([]);
    const [playerHP, setPlayerHP] = useState(100);
    const [coins, setCoins] = useState(0);
    const [stage, setStage] = useState(1);
    const [wave, setWave] = useState(1);
    const [isInfinite, setIsInfinite] = useState(false);

    useEffect(() => {
        setTowers([
            new BasicTower(200, 200),
            new SniperTower(300, 200),
            new CannonTower(250, 250),
            new MageTower(350, 200),
            new MachineGunTower(400, 200)
        ]);
    }, []);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.stageWave}>
                    <h3>{isInfinite ? "Stage Infinite" : `Stage ${stage}`} - Wave {wave}</h3>
                </div>
                <Renderer enemies={enemies} bullets={bullets} towers={towers}/>
                <GameLoop
                    enemies={enemies}
                    bullets={bullets}
                    towers={towers}
                    setEnemies={setEnemies}
                    setBullets={setBullets}
                    setPlayerHP={setPlayerHP}
                />
                <EnemySpawner
                    currentStage={stage}
                    currentWave={wave}
                    setEnemies={setEnemies}
                    setCoins={setCoins}
                />
                <GameInteraction
                    towers={towers}
                    setTowers={setTowers}
                    playerHP={playerHP}
                    setCoins={setCoins}
                    coins={coins}
                />
            </div>
        </>
    )
}

export default GameController;