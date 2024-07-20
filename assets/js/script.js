const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const numCircles = 10;
const circles = [];
const dotRadius = 5;
const lineLength = 10;
let dotSpeed = 0.01; // Initial speed of the dots

// Define circles
for (let i = 0; i < numCircles; i++) {
    circles.push({
        radius: 50 + i * 20, // Adjust the radius increment for each circle
        speed: dotSpeed * (i + 1), // Adjust the speed increment for each circle
        angle: 0
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach((circle, index) => {
        // Draw vertical line
        const lineX = centerX + circle.radius * Math.cos(circle.angle);
        const lineY = centerY + circle.radius * Math.sin(circle.angle);
        ctx.beginPath();
        ctx.moveTo(lineX, lineY);
        ctx.lineTo(lineX, lineY - lineLength);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw dots
        const dotX = centerX + circle.radius * Math.cos(circle.angle);
        const dotY = centerY + circle.radius * Math.sin(circle.angle);
        ctx.beginPath();
        ctx.arc(dotX, dotY, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${(index / numCircles) * 360}, 50%, 50%)`; // Vary color based on circle index
        ctx.fill();

        circle.angle += circle.speed;
        if (circle.angle >= Math.PI * 2) {
            circle.angle = 0;
            playSound(); // Play sound after one full rotation
        }
    });
    requestAnimationFrame(draw);
}

function playSound() {
    // Add your sound playing logic here
    // For example, you can use the Web Audio API or simply play an audio file
    // For simplicity, I'll just log a message here
    console.log('Sound played after one full rotation');
}

function speedUp() {
    dotSpeed += 0.005; // Increase the dot speed
    updateDotsSpeed(dotSpeed);
}

function slowDown() {
    dotSpeed -= 0.005; // Decrease the dot speed
    if (dotSpeed < 0) dotSpeed = 0; // Ensure dot speed doesn't go negative
    updateDotsSpeed(dotSpeed);
}

function updateDotsSpeed(speed) {
    circles.forEach((circle, index) => {
        circle.speed = speed * (index + 1);
    });
}

draw();