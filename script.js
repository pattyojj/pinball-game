document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("pinball-canvas");
    const ctx = canvas.getContext("2d");
    const pullHandleButton = document.getElementById("pull-handle");
    const flipperLeftButton = document.getElementById("flipper-left");
    const flipperRightButton = document.getElementById("flipper-right");

    const responses = {
        "hole1": "Let's circle back on this.",
        "hole2": "We'll put a pin in it.",
        "hole3": "This is not a priority right now.",
        "hole4": "We'll touch base later.",
        "hole5": "Let's drill down into this.",
        "hole6": "We're leveraging synergies here.",
        "hole7": "We'll move the needle on this.",
        "hole8": "This is on our radar.",
        "hole9": "Let's get granular on this.",
        "hole10": "We need to pivot on this."
    };

    // Hole positions
    const holes = [
        { id: "hole1", x: 100, y: 100, radius: 20 },
        { id: "hole2", x: 700, y: 100, radius: 20 },
        { id: "hole3", x: 100, y: 500, radius: 20 },
        { id: "hole4", x: 700, y: 500, radius: 20 },
        { id: "hole5", x: 400, y: 100, radius: 20 },
        { id: "hole6", x: 400, y: 500, radius: 20 },
        { id: "hole7", x: 100, y: 300, radius: 20 },
        { id: "hole8", x: 700, y: 300, radius: 20 },
        { id: "hole9", x: 400, y: 300, radius: 20 },
        { id: "hole10", x: 400, y: 300, radius: 20 }
    ];

    let ball = {
        x: 400,
        y: 300,
        radius: 30,
        dx: 0,
        dy: 0,
        speed: 4
    };

    let flippers = {
        left: { x: 150, y: 540, width: 100, height: 20, active: false },
        right: { x: 550, y: 540, width: 100, height: 20, active: false }
    };

    function drawBall() {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.closePath();
    }

    function drawHoles() {
        ctx.fillStyle = "#f00";
        holes.forEach(hole => {
            ctx.beginPath();
            ctx.arc(hole.x, hole.y, hole.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
        });
    }

    function drawFlippers() {
        ctx.fillStyle = "#f00";
        Object.values(flippers).forEach(flipper => {
            ctx.fillRect(flipper.x, flipper.y, flipper.width, flipper.height);
        });
    }

    function getResponseByHole(x, y) {
        for (const hole of holes) {
            const distance = Math.sqrt((x - hole.x) ** 2 + (y - hole.y) ** 2);
            if (distance < hole.radius) {
                return responses[hole.id];
            }
        }
        return null;
    }

    function displayFeedback(message) {
        const feedback = document.getElementById("feedback");
        feedback.textContent = message;
    }

    function update() {
        ball.x += ball.dx;
        ball.y += ball.dy;

        // Simple gravity effect
        ball.dy += 0.1;

        // Ball collision with canvas edges
        if (ball.x < ball.radius || ball.x > canvas.width - ball.radius) ball.dx = -ball.dx;
        if (ball.y < ball.radius) ball.dy = -ball.dy;
        if (ball.y > canvas.height - ball.radius) ball.y = canvas.height - ball.radius;

        // Ball collision with flippers
        Object.values(flippers).forEach(flipper => {
            if (ball.x > flipper.x && ball.x < flipper.x + flipper.width &&
                ball.y > flipper.y && ball.y < flipper.y + flipper.height) {
                ball.dy = -ball.speed;
            }
        });

        // Check if ball falls into a hole
        const response = getResponseByHole(ball.x, ball.y);
        if (response) {
            ball.dx = 0;
            ball.dy = 0;
            displayFeedback(response);
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawHoles();
        drawBall();
        drawFlippers();
    }

    function gameLoop() {
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }

    function handlePullHandle() {
        ball.dx = Math.random() * 4 - 2;
        ball.dy = -ball.speed;
    }

    function handleKeyDown(event) {
        if (event.key === "ArrowLeft") {
            flippers.left.active = true;
        } else if (event.key === "ArrowRight") {
            flippers.right.active = true;
        }
    }

    function handleKeyUp(event) {
        if (event.key === "ArrowLeft") {
            flippers.left.active = false;
        } else if (event.key === "ArrowRight") {
            flippers.right.active = false;
        }
    }

    pullHandleButton.addEventListener("click", handlePullHandle);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    gameLoop();
});
