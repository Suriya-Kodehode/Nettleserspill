
import React, { useState, useEffect } from "react";
import { iconImages } from "../../assets/imageSource.jsx";

class Player {
  constructor(initialHP = 100) {
    this.hp = initialHP;
  }

  takeDamage(amount) {
    this.hp = Math.max(this.hp - amount, 0);
  }

  heal(amount) {
    this.hp += amount;
  }

  isDefated() {
    return this.hp <= 0;
  }
}

export const player = new Player();

const PlayerStatus = ({ player, iconUrl = iconImages.heart }) => {
  const [hp, setHp] = useState(player.hp);

  useEffect(() => {
    const interval = setInterval(() => {
      setHp(player.hp);
    }, 100);
    return () => clearInterval(interval);
  }, [player]);

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '5px 10px',
    backgroundColor: "inherit",
    borderRadius: '4px',
    color: 'white'
  };

  const iconStyle = {
    width: "32px",
    height: "32px",
    marginRight: '8px',
  };

  const textStyle = {
    fontSize: '1.2rem',
    fontWeight: 'bold'
  };

  return (
    <div style={containerStyle}>
      <img src={iconUrl} alt="Player Icon" style={iconStyle} />
      <span style={textStyle}>{hp}</span>
    </div>
  );
};

export default PlayerStatus;
