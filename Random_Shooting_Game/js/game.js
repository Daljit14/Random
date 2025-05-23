let canvas, ctx;
let player;
let enemies = [];
let bullets = [];
let score = 0;
let gameOver = false;
let enemySpawner;
let animationId;
let lastTime = 0;

function initGame() {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;

    // Initialize game objects
    player = new Player(canvas);
    enemySpawner = new EnemySpawner(canvas);
    enemies = [];
    bullets = [];
    score = 0;
    gameOver = false;
    updateScore();

    // Hide game over screen and show start button
    document.getElementById('gameOver').style.display = 'none';
    document.getElementById('startButton').style.display = 'block';
}

function startGame() {
    document.getElementById('startButton').style.display = 'none';
    gameLoop();
}

function gameLoop(currentTime = 0) {
    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    // Clear canvas
    ctx.fillStyle = '#000033';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (!gameOver) {
        // Spawn enemies
        const newEnemy = enemySpawner.update(currentTime);
        if (newEnemy) enemies.push(newEnemy);

        // Update and draw player
        player.update();
        player.draw();

        // Update and draw bullets
        bullets = bullets.filter(bullet => {
            bullet.draw();
            return !bullet.update();
        });

        // Update and draw enemies
        enemies = enemies.filter(enemy => {
            enemy.draw();
            
            // Check collision with player
            if (enemy.collidesWith(player)) {
                endGame();
                return false;
            }

            // Check collision with bullets
            for (let bullet of bullets) {
                if (bullet.collidesWith(enemy)) {
                    score += enemy.points;
                    updateScore();
                    bullets = bullets.filter(b => b !== bullet);
                    return false;
                }
            }

            return !enemy.update();
        });

        animationId = requestAnimationFrame(gameLoop);
    }
}

function endGame() {
    gameOver = true;
    document.getElementById('finalScore').textContent = score;
    document.getElementById('gameOver').style.display = 'block';
    cancelAnimationFrame(animationId);
}

function resetGame() {
    initGame();
    startGame();
}

function updateScore() {
    document.getElementById('scoreValue').textContent = score;
}

function setDifficulty(difficulty) {
    enemySpawner.setDifficulty(difficulty);
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (gameOver && e.code === 'Space') resetGame();
    
    switch(e.code) {
        case 'ArrowLeft':
        case 'KeyA':
            player.startMoving('left');
            break;
        case 'ArrowRight':
        case 'KeyD':
            player.startMoving('right');
            break;
        case 'ArrowUp':
        case 'KeyW':
            player.startMoving('up');
            break;
        case 'ArrowDown':
        case 'KeyS':
            player.startMoving('down');
            break;
        case 'Space':
            const bullet = player.shoot();
            if (bullet) bullets.push(bullet);
            break;
    }
});

document.addEventListener('keyup', (e) => {
    switch(e.code) {
        case 'ArrowLeft':
        case 'KeyA':
            player.stopMoving('left');
            break;
        case 'ArrowRight':
        case 'KeyD':
            player.stopMoving('right');
            break;
        case 'ArrowUp':
        case 'KeyW':
            player.stopMoving('up');
            break;
        case 'ArrowDown':
        case 'KeyS':
            player.stopMoving('down');
            break;
    }
});

// Initialize game when window loads
window.addEventListener('load', initGame);