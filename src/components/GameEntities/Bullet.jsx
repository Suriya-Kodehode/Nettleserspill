export class Bullet {
    constructor(x, y, target, damage) {
        this.x = x;
        this.y = y;
        this.target = target;
        this.damage = damage;
        this.speed = 6;
        this.radius = 5;
    }

    move() {
        if (this.target) {
            const dx = this.target.x - this.x;
            const dy = this.target.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Normalize direction
            const dxNormlize = dx / distance;
            const dyNormalize = dy / distance;

            this.x += dxNormlize * this.speed;
            this.y += dyNormalize * this.speed;

            // Check if bullet reached the target
            if (distance <= this.speed) {
                this.target.takeDamage(this.damage);
                return true;
            }
        }
        return false;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "#FF0000"; // Bullet color
        ctx.fill();
        ctx.stroke();
    }
}