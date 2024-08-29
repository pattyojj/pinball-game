document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("pinball-canvas");
    const ctx = canvas.getContext("2d");

    function drawBall() {
        ctx.beginPath();
        ctx.arc(400, 300, 30, 0, Math.PI * 2);
        ctx.fillStyle = "#000";
        ctx.fill();
        ctx.closePath();
    }

    function displayFeedback(message) {
        const feedback = document.getElementById("feedback");
        feedback.textContent = message;
    }

    drawBall();
    displayFeedback("Welcome to Corporate Magic 8 Ball!");
});
