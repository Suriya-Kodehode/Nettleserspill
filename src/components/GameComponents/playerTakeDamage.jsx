import { player } from "../UI/PlayerStatus.jsx";

export const playerTakeDamage = (damage) => {
  player.hp = Math.max(0, player.hp - damage);

  if (player.hp === 0) {
    console.log("Game Over: Player has been defeated.");
    const event = new CustomEvent("gameOver", { detail: { gameOver: true } });
    window.dispatchEvent(event);
  }
};
