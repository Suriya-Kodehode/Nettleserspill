import { Bullet } from './Bullet.jsx'

// Basic Tower: simple and cheap tower, fit for early game, cannot target flying enemy
export class BasicTower {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.level = 1;
        this.range = 100;
        this.attackSpeed = 1000;
        this.damage = 10;
        this.isGrounded = true;
        this.targetingMode = 'first';
        this.upgradeCost = 50;
        this.lastAttackTime = 0;
        this.sprite = new Image();
        this.sprite.src = null; // <- image path
    }

    attack(enemies, setBullets) {
        const now = Date.now();
        if (now - this.lastAttackTime < this.attackSpeed) return;
        this.lastAttackTime = now;

        let target = this.getTarget(enemies);
        if (target && this.distanceTo(target) <= this.range) {
            setBullets((prevBullets) => [...prevBullets, new Bullet(this.x, this.y, target, this.damage)]);
        }
        setBullets((prevBullets) => prevBullets.filter(bullet => !bullet.move()));
    }

    getTarget(enemies) {
        return enemies.reduce((best, enemy) => {
            if (!best) return enemy;
            switch (this.targetingMode) {
                case "closest":
                    return this.distanceTo(enemy) < this.distanceTo(best) ? enemy : best;
                case "furthest":
                    return this.distanceTo(enemy) > this.distanceTo(best) ? enemy : best;
                case "highestHP":
                    return enemy.health > best.health ? enemy : best;
                case "lowestHP":
                    return enemy.health < best.health ? enemy : best;
                case "fastest":
                    return enemy.speed > best.speed ? enemy : best;
                case "first":
                default:
                    return best;
            }
        }, null)
    }

    upgrade() {
        if (this.level < 10) {
            this.level++;
            this.damage += 5;
            this.range += 5;
            this.attackSpeed = Math.max(200, this.attackSpeed - 50);
            this.upgradeCost += 50;
        }
    }

    distanceTo(enemy) {
        return Math.sqrt((this.x - enemy.x) ** 2 + (this.y - enemy.y) ** 2);
    }

    draw(ctx) {
        ctx.drawImage(this.sprite, this.x, this.y, 40, 40);
    }
}

// Sniper Tower: High range, extra damage to flying enemies, slower fire rate
export class SniperTower extends BasicTower {
    constructor(x, y) {
        super(x, y);
        this.range = 300;
        this.attackSpeed = 2000;
        this.damage = 50;
        this.isGrounded = false;
        this.sprite.src = null // <-- path to sniper tower image
        this.upgradeCost = 75;
    }
}

// Cannon Tower: Deal highest damage, cannot attack flying enemy
export class CannonTower extends BasicTower {
    constructor(x, y) {
        super(x, y);
        this.range = 150;
        this.attackSpeed = 1000;
        this.damage = 70;
        this.isGrounded = true;
        this.sprite.src = null; // <- path to cannon tower image
        this.upgradeCost = 100;
    }
}

// Mage Tower: AoE damage
export class MageTower extends BasicTower {
    constructor(x, y) {
        super(x, y);
        this.range = 120;
        this.attackSpeed = 1500;
        this.damage = 30;
        this.isGrounded = false;
        this.sprite.src = null; // <- path to magic tower image
        this.upgradeCost = 80;
    }

    // Overriding attack to deal AoE damage
    attack(enemies, setBullets) {
        const now = Date.now();
        if (now - this.lastAttackTime < this.attackSpeed) return;
        this.lastAttackTime = now;

        let targets = enemies.filter(enemy => this.distanceTo(enemy) <= this.range);
        targets.forEach(target => {
            setBullets((prevBullets) => [...prevBullets, new Bullet(this.x, this.y, target, this.damage)]);
        });
    }
}

// Machine Gun Tower: Medium range, highest fire rate
export class MachineGunTower extends BasicTower {
    constructor(x, y) {
        super(x, y);
        this.range = 150;
        this.attackSpeed = 300;
        this.damage = 10;
        this.isGrounded = false;
        this.sprite.src = null; // <- path to machine gun tower image
        this.upgradeCost = 60;
    }
}