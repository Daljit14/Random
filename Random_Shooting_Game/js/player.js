class Player {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = 40;
        this.height = 40;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - this.height - 20;
        this.speed = 5;
        this.dx = 0;
        this.dy = 0;
        this.color = '#4a9eff';
        this.shootCooldown = 0;
        this.shootDelay = 250; // milliseconds between shots
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        // Draw triangular ship
        this.ctx.moveTo(this.x + this.width / 2, this.y);
        this.ctx.lineTo(this.x + this.width, this.y + this.height);
        this.ctx.lineTo(this.x, this.y + this.height);
        this.ctx.closePath();
        this.ctx.fill();

        // Draw engine glow
        this.ctx.fillStyle = '#ff6b6b';
        this.ctx.beginPath();
        this.ctx.moveTo(this.x + this.width * 0.3, this.y + this.height);
        this.ctx.lineTo(this.x + this.width * 0.5, this.y + this.height + 10);
        this.ctx.lineTo(this.x + this.width * 0.7, this.y + this.height);
        this.ctx.closePath();
        this.ctx.fill();
    }

    update() {
        // Update position
        this.x = Math.max(0, Math.min(this.canvas.width - this.width, this.x + this.dx));
        this.y = Math.max(0, Math.min(this.canvas.height - this.height, this.y + this.dy));

        // Update shoot cooldown
        if (this.shootCooldown > 0) {
            this.shootCooldown -= 16; // Assuming 60 FPS (1000ms / 60 ≈ 16ms)
        }
    }

    startMoving(direction) {
        switch(direction) {
            case 'left':
                this.dx = -this.speed;
                break;
            case 'right':
                this.dx = this.speed;
                break;
            case 'up':
                this.dy = -this.speed;
                break;
            case 'down':
                this.dy = this.speed;
                break;
        }
    }

    stopMoving(direction) {
        switch(direction) {
            case 'left':
            case 'right':
                this.dx = 0;
                break;
            case 'up':
            case 'down':
                this.dy = 0;
                break;
        }
    }

    canShoot() {
        return this.shootCooldown <= 0;
    }

    shoot() {
        if (this.canShoot()) {
            this.shootCooldown = this.shootDelay;
            return new Bullet(
                this.x + this.width / 2,
                this.y,
                0,
                -10,
                this.canvas
            );
        }
        return null;
    }
}