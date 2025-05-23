class Enemy {
    constructor(canvas, speed = 2) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = 30;
        this.height = 30;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = -this.height;
        this.speed = speed;
        this.color = '#ff4757';
        this.points = 10;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        
        // Draw enemy ship body
        this.ctx.beginPath();
        this.ctx.moveTo(this.x + this.width / 2, this.y + this.height);
        this.ctx.lineTo(this.x + this.width, this.y);
        this.ctx.lineTo(this.x, this.y);
        this.ctx.closePath();
        this.ctx.fill();

        // Draw enemy glow effect
        this.ctx.fillStyle = 'rgba(255, 71, 87, 0.3)';
        this.ctx.beginPath();
        this.ctx.arc(this.x + this.width / 2, this.y + this.height / 2, 
                    this.width / 1.5, 0, Math.PI * 2);
        this.ctx.fill();
    }

    update() {
        this.y += this.speed;
        return this.y > this.canvas.height;
    }

    collidesWith(object) {
        return !(this.x + this.width < object.x ||
                this.x > object.x + object.width ||
                this.y + this.height < object.y ||
                this.y > object.y + object.height);
    }
}

class EnemySpawner {
    constructor(canvas, difficulty = 'normal') {
        this.canvas = canvas;
        this.setDifficulty(difficulty);
        this.lastSpawnTime = 0;
    }

    setDifficulty(difficulty) {
        switch(difficulty) {
            case 'hard':
                this.spawnInterval = 800;
                this.enemySpeed = 4;
                break;
            case 'medium':
                this.spawnInterval = 1000;
                this.enemySpeed = 3;
                break;
            default: // normal
                this.spawnInterval = 1500;
                this.enemySpeed = 2;
                break;
        }
    }

    update(currentTime) {
        if (currentTime - this.lastSpawnTime > this.spawnInterval) {
            this.lastSpawnTime = currentTime;
            return new Enemy(this.canvas, this.enemySpeed);
        }
        return null;
    }
}