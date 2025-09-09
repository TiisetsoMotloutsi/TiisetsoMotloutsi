document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Simulate sending message
    const output = document.getElementById('form-output');
    output.textContent = "Thank you for reaching out! I'll get back to you soon.";
    this.reset();
});
// SNAKE GAME
(function() {
    const canvas = document.getElementById('snake-canvas');
    if (!canvas) return; // Don't run if not present
    const ctx = canvas.getContext('2d');
    const box = 20;
    const rows = canvas.width / box;
    const cols = canvas.height / box;

    let snake;
    let direction;
    let food;
    let score;
    let gameInterval;
    let isGameOver = false;

    function startGame() {
        snake = [{x: 8, y: 8}];
        direction = 'RIGHT';
        score = 0;
        isGameOver = false;
        placeFood();
        updateScore();
        if (gameInterval) clearInterval(gameInterval);
        gameInterval = setInterval(draw, 110);
    }

    function placeFood() {
        food = {
            x: Math.floor(Math.random() * rows),
            y: Math.floor(Math.random() * cols)
        };
        // Ensure food doesn't spawn on snake
        if (snake.some(seg => seg.x === food.x && seg.y === food.y)) {
            placeFood();
        }
    }

    function updateScore() {
        document.getElementById('snake-score').textContent = `Score: ${score}`;
    }

    function draw() {
        ctx.fillStyle = "#eee";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw snake
        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = i === 0 ? "#222" : "#d1bfa7";
            ctx.fillRect(snake[i].x * box, snake[i].y * box, box - 2, box - 2);
            ctx.strokeStyle = "#fff";
            ctx.strokeRect(snake[i].x * box, snake[i].y * box, box - 2, box - 2);
        }

        // Draw food
        ctx.fillStyle = "#222";
        ctx.beginPath();
        ctx.arc(food.x * box + box/2, food.y * box + box/2, box/2.5, 0, 2 * Math.PI);
        ctx.fill();

        // Move snake
        let head = {x: snake[0].x, y: snake[0].y};
        switch(direction) {
            case 'LEFT': head.x -= 1; break;
            case 'UP': head.y -= 1; break;
            case 'RIGHT': head.x += 1; break;
            case 'DOWN': head.y += 1; break;
        }

        // Check collision
        if (
            head.x < 0 || head.x >= rows ||
            head.y < 0 || head.y >= cols ||
            snake.some(seg => seg.x === head.x && seg.y === head.y)
        ) {
            isGameOver = true;
            clearInterval(gameInterval);
            ctx.fillStyle = "#b65c5c";
            ctx.font = "1.4rem Segoe UI, Arial";
            ctx.textAlign = "center";
            ctx.fillText("Game Over", canvas.width/2, canvas.height/2);
            return;
        }

        snake.unshift(head);

        // Check food collision
        if (head.x === food.x && head.y === food.y) {
            score += 1;
            updateScore();
            placeFood();
        } else {
            snake.pop();
        }
    }

    // Controls
    document.addEventListener('keydown', function(e) {
        if (isGameOver) return;
        switch(e.key) {
            case 'ArrowLeft': if (direction !== 'RIGHT') direction = 'LEFT'; break;
            case 'ArrowUp': if (direction !== 'DOWN') direction = 'UP'; break;
            case 'ArrowRight': if (direction !== 'LEFT') direction = 'RIGHT'; break;
            case 'ArrowDown': if (direction !== 'UP') direction = 'DOWN'; break;
        }
    });

    // Restart button
    document.getElementById('snake-restart').addEventListener('click', startGame);

    // Auto-focus canvas for keyboard control
    canvas.addEventListener('click', () => canvas.focus());
    // Start game on load
    startGame();
})();
