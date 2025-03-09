let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');
let carImage = new Image();
let carSpeed = 5;
let carX = canvas.width / 2;
let carY = canvas.height / 2;
let carAngle = 0;
let isDrifting = false;

function startGame(carType) {
    // Hide the car selection screen and display the canvas
    document.querySelector('.car-selection').style.display = 'none';
    canvas.style.display = 'block';

    // Select car based on the type chosen
    if (carType === 'm4') {
        carImage.src = 'images/bmw-m4.png'; // Update with actual image path
    } else if (carType === 'truck') {
        carImage.src = 'images/truck.png'; // Update with actual image path
    } else if (carType === 'ae86') {
        carImage.src = 'images/ae86.png'; // Update with actual image path
    } else if (carType === 'skyline') {
        carImage.src = 'images/skyline.png'; // Update with actual image path
    }

    // Make sure the game loop starts once the image is loaded
    carImage.onload = function() {
        gameLoop();
    };
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the car
    ctx.save();
    ctx.translate(carX, carY);
    ctx.rotate(carAngle);
    ctx.drawImage(carImage, -carImage.width / 2, -carImage.height / 2);
    ctx.restore();

    // Car movement logic
    if (isDrifting) {
        carX += Math.cos(carAngle) * carSpeed * 1.5; // Drift faster
        carY += Math.sin(carAngle) * carSpeed * 1.5;
    } else {
        carX += Math.cos(carAngle) * carSpeed;
        carY += Math.sin(carAngle) * carSpeed;
    }

    // Keep the car inside the canvas bounds
    if (carX < 0) carX = canvas.width;
    if (carX > canvas.width) carX = 0;
    if (carY < 0) carY = canvas.height;
    if (carY > canvas.height) carY = 0;

    // Request the next frame for animation
    requestAnimationFrame(gameLoop);
}

// Listen for keyboard controls
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowUp') {
        carSpeed = 7; // Speed up
    } else if (e.key === 'ArrowDown') {
        carSpeed = 3; // Slow down
    } else if (e.key === 'ArrowLeft') {
        carAngle -= 0.05; // Turn left
    } else if (e.key === 'ArrowRight') {
        carAngle += 0.05; // Turn right
    } else if (e.key === ' ') {
        isDrifting = true; // Drift
    }
});

document.addEventListener('keyup', function(e) {
    if (e.key === ' ') {
        isDrifting = false; // Stop drifting
    }
});
