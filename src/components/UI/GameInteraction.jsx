import { useState } from "react";

import styles from '../../CSSModules/GameInteraction.module.css';

import { BasicTower, SniperTower, CannonTower, MageTower, MachineGunTower } from "../GameEntities/Tower.jsx";

export const GameInteraction = ({ towers, setTowers, playerHP, setCoins, coins }) => {
    const [selectedTower, setSelectedTower] = useState(null);

    const handleTowerPlacement = (x, y) => {
        if (selectedTower && coins >= selectedTower.upgradeCost) {
            setCoins(coins - selectedTower.upgradeCost);
            selectedTower.x = x;
            selectedTower.y = y;
            setTowers([...towers, selectedTower]);
            setSelectedTower(null);
        } else {
            alert("Not enough coins!")
        }
    }

    const handleTowerUpgrade = (tower) => {
        if (tower.level < 10 && coins >= tower.upgradeCost) {
            tower.upgrade();
            setCoins(coins - tower.upgradeCost);
            setTowers([...towers.filter(t => t !== tower), tower]);
        } else {
            alert("Not enough coins")
        }
    };

    return (
        <>
            <div className={styles.container}>
                <h3>Tower Management</h3>
                <div className={styles.stats}>
                    <span>Coins: {coins}</span>
                    <span>HP: {playerHP}</span>
                </div>
                <div className={styles.buttonGroup}>
                    <button onClick={() => setSelectedTower(new BasicTower(0, 0))}>
                        Place Basic Tower
                    </button>
                    <button onClick={() => setSelectedTower(new SniperTower(0, 0))}>
                        Place Sniper Tower
                    </button>
                    <button onClick={() => setSelectedTower(new CannonTower(0, 0))}>
                        Place Cannon Tower
                    </button>
                    <button onClick={() => setSelectedTower(new MageTower(0, 0))}> 
                        Place Mage Tower
                    </button>
                    <button onClick={() => setSelectedTower(new MachineGunTower(0, 0))}>
                        Place Machine Gun Tower
                    </button>
                </div>
                <div className={styles.selectedInfo}>
                    <h4>
                        Selected Tower: {selectedTower ? selectedTower.constructor.name : 'None'}
                        <p>Cost: {selectedTower ? selectedTower.upgradeCost : 0} Coins</p>
                    </h4>
                </div>
                <div className={styles.upgradeSection}>
                    <h3>Upgrades</h3>
                    {towers.map((tower, index) => (
                        <div key={index} className={styles.upgradeItem}>
                            <span>{tower.constructor.name} (Level {tower.level})</span>
                            <button 
                                onClick={() => handleTowerUpgrade(tower)}
                                disabled={tower.level === 10}
                                style={{ backgroundColor: tower.level === 10 ? 'gray' : '' }}
                            >
                                {tower.level === 10 ? "Max Level" : "Upgrade"}
                            </button>
                        </div>
                    ))}
                </div>
                <div className={styles.canvasArea} onClick={(e) => {
                    const canvas = e.target;
                    const rect = canvas.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    handleTowerPlacement(x, y);
                }}>
                </div>
            </div>
        </>
    )
}

export default GameInteraction;