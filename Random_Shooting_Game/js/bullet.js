class Bullet {
    constructor(x, y, dx, dy, canvas) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = 4;
        this.height = 10;
        this.color = '#4a9eff';
    }

    draw() {
        this.ctx.fillStyle = this.color;
        
        // Draw bullet body
        this.ctx.fillRect(this.x - this.width / 2, this.y, this.width, this.height);

        // Draw bullet glow
        this.ctx.fillStyle = 'rgba(74, 158, 255, 0.3)';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y + this.height / 2, 
                    this.width * 2, 0, Math.PI * 2);
        this.ctx.fill();
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;
        return this.y < -this.height || 
               this.y > this.canvas.height || 
               this.x < -this.width || 
               this.x > this.canvas.width;
    }

    collidesWith(object) {
        return !(this.x + this.width < object.x ||
                this.x - this.width > object.x + object.width ||
                this.y + this.height < object.y ||
                this.y > object.y + object.height);
    }
}