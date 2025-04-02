
// Basic enemy class
export class BasicEnemy {
    constructor(x, y, path, setEnemies, setCoins) {
        this.x = x;
        this.y = y;
        this.path = path;
        this.health = 100;
        this.speed = 3;
        this.coinReward = 5;
        this.currentPathIndex = 0;
        this.setEnemies = setEnemies;
        this.setCoins = setCoins;
        this.isFlying = false;
        this.sprite = new Image();
        this.sprite.src = null; // <- placeholder for basic enemy image path
    }
    move() {
        if (this.currentPathIndex < this.path.length - 1) {
            const target = this.path[this.currentPathIndex + 1];
            const dx = target.x - this.x;
            const dy = target.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.speed) {
                this.currentPathIndex++;
            } else {
                this.x += (dx / distance) * this.speed;
                this.y += (dy / distance) * this.speed;
            }
        }
    }

    takeDamage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            this.die();
        }
    }

    die() {
        this.setEnemies((prevEnemies) => prevEnemies.filter((enemy) => enemy !== this));
        this.setCoins((prevCoins) => prevCoins + this.coinReward);
    }

    canBeTargetedBy(tower) {
        return true;
    }

    render(ctx) {
        ctx.drawImage(this.sprite, this.x, this.y, 40, 40);
    }
}

// SwarmEnemy: Low HP, spawns in groups of 5, lower coin reward
export class SwarmEnemy extends BasicEnemy {
    static spawnSwarm(x, y, path, setEnemies, setCoins) {
        const swarm = Array.from({ length: 5 }, () => new SwarmEnemy(x, y, path, setEnemies, setCoins));
        setEnemies((prevEnemies) => [...prevEnemies, ...swarm]);
    }

    constructor(x, y, path, setEnemies, setCoins) {
        super(x, y, path, setEnemies, setCoins);
        this.health = 50;
        this.speed = 3.5;
        this.coinReward = 2;
        this.sprite.src = null; // <-- placeholder for swarm enemy image path
    }
}

// SpeedEnemy: Fastest enemy
export class SpeedEnemy extends BasicEnemy {
    constructor(x, y, path, setEnemies, setCoins) {
        super(x, y, path, setEnemies, setCoins);
        this.health = 120;
        this.speed = 4.5;
        this.coinReward = 6;
        this.sprite.src = null; // <-- place holder for speed enemy image path
    }
}

// TankEnemy: High HP, slower speed
export class TankEnemy extends BasicEnemy {
    constructor(x, y, path, setEnemies, setCoins) {
        super(x, y, path, setEnemies, setCoins);
        this.health = 500;
        this.speed = 2;
        this.coinReward = 15;
        this.sprite.src = null; // <-- placeholder for tank enemy image path
    }
}

// FlyingEnemy: Ignores basic and cannon towers, take extra damage from sniper towers, slightly faster speed
export class FlyingEnemy extends BasicEnemy {
    constructor(x, y, path, setEnemies, setCoins) {
        super(x, y, path, setEnemies, setCoins);
        this.health = 150;
        this.speed = 3.5;
        this.coinReward = 7;
        this.isFlying = true;
        this.sprite.src = null; // <-- placeholder for flying enemy image path
    }

    // Override to check if it should be targeted by the sniper tower
    canBeTargetedBy(tower) {
        return !tower.isGrounded;
    }
}