const canvas = document.getElementById('pinball-canvas');
const ctx = canvas.getContext('2d');

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 30,  // Adjusted size for the Magic 8 Ball
    dx: 2,
    dy: -2
};

// Load the Magic 8 Ball image
const img = new Image();
img.src = 'magic-8-ball.png';  // Path to your Magic 8 Ball image

// Draw the Magic 8 Ball on the canvas
function drawBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear canvas before drawing
    ctx.drawImage(img, ball.x - ball.radius, ball.y - ball.radius, ball.radius * 2, ball.radius * 2);
}

function updateBallPosition() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx;
    }
    if (ball.y + ball.dy > canvas.height - ball.radius || ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
    }
}

function draw() {
    drawBall();
    updateBallPosition();
    requestAnimationFrame(draw);
}

draw();
