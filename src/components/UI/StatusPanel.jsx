import React from "react";
import PlayerStatus from "./PlayerStatus.jsx";
import styles from "../../CSSModules/game.module.css";

const StatusPanel = ({ player, selectedEnemy }) => {
  return (
    <div className={styles.statusContainer}>
      <div className={styles.playerStatus}>
        <PlayerStatus player={player} />
      </div>
      <div className={styles.enemyDetails}>
        {selectedEnemy ? (
          <div>
            <h3>
              {(selectedEnemy.name || selectedEnemy.sprite)
                .charAt(0)
                .toUpperCase() +
                (selectedEnemy.name || selectedEnemy.sprite).slice(1)}
            </h3>
            <p>HP: {selectedEnemy.hp}</p>
          </div>
        ) : (
          <p>Select an enemy to see its details</p>
        )}
      </div>
    </div>
  );
};

export default StatusPanel;