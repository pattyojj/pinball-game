document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("pinball-canvas");
    const ctx = canvas.getContext("2d");

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

    // Holes positions (for simplicity, placed at the corners and center)
    const holes = [
        { id: "hole1", x: 50, y: 50, radius: 20 },
        { id: "hole2", x: 750, y: 50, radius: 20 },
        { id: "hole3", x: 50, y: 550, radius: 20 },
        { id: "hole4", x: 750, y: 550, radius: 20 },
        { id: "hole5", x: 400, y: 50, radius: 20 },
        { id: "hole6", x: 400, y: 550, radius: 20 },
        { id: "hole7", x: 100, y: 300, radius: 20 },
        { id: "hole8", x: 700, y: 300, radius: 20 },
        { id: "hole9", x: 100, y: 300, radius: 20 },
        { id: "hole10", x: 700, y: 300, radius: 20 }
    ];

    function drawBall(x, y) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(x, y, 30, 0, Math.PI * 2);
        ctx.fillStyle = "#000";
        ctx.fill();
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 5;
        ctx.stroke();
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

    function getResponseByHole(x, y) {
        for (const hole of holes) {
            const distance = Math.sqrt((x - hole.x) ** 2 + (y - hole.y) ** 2);
            if (distance < hole.radius) {
                return responses[hole.id];
            }
        }
        return "Ball not in any hole.";
    }

    function displayFeedback(message) {
        const feedback = document.getElementById("feedback");
        feedback.textContent = message;
    }

    function handleClick(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        drawBall(x, y);

        // Simulate the ball falling into a hole (for now, click position is used)
        const response = getResponseByHole(x, y);
        displayFeedback(response);
    }

    canvas.addEventListener("click", handleClick);

    // Initial setup
    drawHoles();
    drawBall(400, 300); // Draw ball in the center
    displayFeedback("Welcome to Corporate Magic 8 Ball! Click to get an answer.");
});
