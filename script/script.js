const gameContainer = document.getElementById("gameContainer");
const canvas = document.getElementById("gameCanvas");
const timerDisplay = document.getElementById("timerDisplay");
const pizzaCountDisplay = document.getElementById("pizzaCountDisplay");
const blockCountDisplay = document.getElementById("blockCountDisplay");

const ctx = canvas.getContext('2d');

const carImg = new Image();
carImg.onload = drawInstructions;
carImg.src = 'Image/image1.svg';  // replace with the actual path to your car image
const targetImg = new Image();
targetImg.onload = drawInstructions;
targetImg.src = 'Image/image2.svg'; // replace with the URL of your target image

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let trials = 0;
const maxTrials = 30;
const breakDuration = 10; // 30 seconds
let breakTime = breakDuration;
let blockScores = [];
blockScores.push(1);
let onBreak = false;

let data = []; // Data for each frame will be stored here
let frameCount = 0; // Frame counter

let gameStarted = false;
let carMoved = false;
let blockStartTime = new Date().getTime();
let elapsedTime = 0;
let timerInterval = null;
let bestTime = [];

let angle_rad;
const maxBlocks = 15;

const identifier = localStorage.getItem('identifier');
pizzaCountDisplay.textContent = `Pizzas: 0/${maxTrials}`; // Increment the trial count and update the pizza count display to show the total number of trials
blockCountDisplay.textContent = `Block: ${blockScores.length}/${maxBlocks}`;

// The circle object
const circle = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 6,
  vx: 0,
  vy: 0,
  ax: 0,
  ay: 0,
  direction: 0,  // Add a property to keep track of the direction of the car
  friction: 0.99, // Add a friction property to slow down the car
  maxVelocity: 0.005 * (canvas.height + canvas.height)/2, // Add a max velocity property to limit the speed of the car
  acceleration: 0.000125
};

const target = {
    x: 0,
    y: 0,
    size: 15
};

const keys = {};

// Key mappings
const mappings = [
  { w: 'left', s: 'right', j: 'up', l: 'down' },
  { w: 'up', s: 'down', j: 'left', l: 'right' }
];
let currentMapping = 0;

function setTargetPosition() {
  target.x = Math.random() * (canvas.width - target.size);
  target.y = Math.random() * (canvas.height - target.size);
}

function drawCar() {
  ctx.save();

  ctx.translate(circle.x, circle.y);

  // Rotate the canvas to the angle of the car based on the direction, not the velocity
  ctx.rotate(circle.direction);

  ctx.drawImage(carImg, -circle.size, -circle.size, circle.size * 5, circle.size * 3);

  ctx.restore();
}

function drawTarget() {
  ctx.drawImage(targetImg, target.x - target.size, target.y - target.size, target.size * 2, target.size * 2);
}

function collectPizza() {
  const distance = Math.sqrt((circle.x - target.x) ** 2 + (circle.y - target.y) ** 2);
  if (distance < circle.size + target.size) {
    pizzaCountDisplay.textContent = `Pizzas: ${++trials}/${maxTrials}`; // Increment the trial count and update the pizza count display to show the total number of trials
    setTargetPosition();
    if (trials >= maxTrials) {
      startBreak();
      pizzaCountDisplay.style.backgroundColor = 'red';
      pizzaCountDisplay.style.animation = 'blink 1s infinite';
      timerDisplay.style.backgroundColor = 'red';
      timerDisplay.style.animation = 'blink 1s infinite';
    }
  }
}

function keepCircleInBounds() {
  if (circle.x - circle.size < 0) {
      circle.x = circle.size;
      circle.vx = 0; // Reset velocity in x direction
  }
  if (circle.x + circle.size > canvas.width) {
      circle.x = canvas.width - circle.size;
      circle.vx = 0; // Reset velocity in x direction
  }
  if (circle.y - circle.size < 0) {
      circle.y = circle.size;
      circle.vy = 0; // Reset velocity in y direction
  }
  if (circle.y + circle.size > canvas.height) {
      circle.y = canvas.height - circle.size;
      circle.vy = 0; // Reset velocity in y direction
  }
}

// Key event handlers for ending the break (Space key)
function handleKeyDown(event) {
  keys[event.key] = true;
  if (onBreak && event.key === " " && breakTime <= 0 && blockScores.length - 1 < maxBlocks) {
      onBreak = false;
      breakTime = breakDuration;
      pizzaCountDisplay.style.backgroundColor = '';
      pizzaCountDisplay.style.animation = '';
      timerDisplay.style.backgroundColor = '';
      timerDisplay.style.animation = '';
      blockCountDisplay.textContent = `Block: ${blockScores.length}/${maxBlocks}`; // Increment the trial count and update the pizza count display to show the total number of trials
      blockStartTime = new Date().getTime(); // Reset the game start time
      startTimer(); // Restart the timer
      pizzaCountDisplay.textContent = `Pizzas: 0/${maxTrials}`; // Increment the trial count and update the pizza count display to show the total number of trials
      window.removeEventListener("keydown", handleKeyDown);
      window.addEventListener("keydown", handleKeyDown); // Reattach handleKeyDown event listener
      window.addEventListener("keyup", handleKeyUp);
  }
}

// Key event handler to make sure the car only stops when the key is released
function handleKeyUp(event) {
  keys[event.key] = false;

    // Reset acceleration
    if (event.key === 'w' || event.key === 's') circle.ax = 0;
    if (event.key === 'j' || event.key === 'l') circle.ay = 0;
}

// Move the circle in the specified direction
function moveCircle(direction) {
  const acceleration = circle.acceleration *  (canvas.height + canvas.width)/2;  // Define a constant acceleration based on the size of the canvas

  switch (direction) {
      case 'left':
        circle.ax = -acceleration;
          break;
      case 'right':
        circle.ax = acceleration;
          break;
      case 'up':
        circle.ay = -acceleration;
          break;
      case 'down':
        circle.ay = acceleration;
        break;
  }

  // If both directions are being pressed at the same time, update the direction accordingly
  circle.direction = angle_rad;
  carMoved = true;
}

// Draw the instructions on the canvas.
function drawInstructions() {
  ctx.fillStyle = "white";
  ctx.font = "24px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Pizza Delivery Game", canvas.width / 2, canvas.height / 2 - 180);
  ctx.fillText("Your task is to deliver all pizzas as fast as possible.", canvas.width / 2, canvas.height / 2 - 130);
  ctx.fillText("The current deliver spot is marked by a pizza slice.", canvas.width / 2, canvas.height / 2 - 80);
  ctx.fillText('Move your car with "w", "s", "j", and "l" to drive to the deliver spot.', canvas.width / 2, canvas.height / 2 - 30);
  ctx.fillText("The faster you are, the higher the tip will be.", canvas.width / 2, canvas.height / 2 + 20);
  // Draw the Start Game button
  ctx.fillStyle = "lightgray";
  ctx.fillRect(canvas.width / 2 - 100, canvas.height / 2 + 120, 200, 50);
  ctx.fillStyle = "black";
  ctx.fillText("Start Game", canvas.width / 2, canvas.height / 2 + 150);
  // Draw the car and pizza images
  ctx.drawImage(carImg, canvas.width*0.05, canvas.height*0.05, canvas.height*0.14, canvas.height*0.07);
  ctx.drawImage(targetImg, canvas.width*0.9, canvas.height*0.04, canvas.height*0.1, canvas.height*0.1);
}

// Start the break
function startBreak() {
  onBreak = true;
  stopTimer(); // Stop the timer
  blockScores.push(1);
  trials = 0;
  frameCount = 0;

  sendPizzaDataToServer(data);
  data = []; // Reset data
  const breakInterval = setInterval(() => {
    breakTime -= 1;
    if (breakTime <= 0) {
      clearInterval(breakInterval);
      window.addEventListener("keydown", handleKeyDown);
    }
  }, 1000);
}

// Draw the break info
function drawBreakInfo() {
  // Reset the position, velocity and acceleration
  circle.x = canvas.width / 2;
  circle.y = canvas.height / 2;
  circle.vx = 0;
  circle.vy = 0;
  circle.ax = 0;
  circle.ay = 0;

  ctx.fillStyle = "white";
  ctx.font = "24px Arial";
  ctx.textAlign = "center";
  ctx.fillText(`Time needed to deliver all pizzas: ${formatTime(bestTime.slice(-1))}`, canvas.width / 2, canvas.height / 2 - 50);
  ctx.fillText(`Your fastest deliver time this session: ${formatTime(Math.min(...bestTime))}`, canvas.width / 2, canvas.height / 2);
  ctx.fillText(`Break Time Remaining: ${breakTime}s`, canvas.width / 2, canvas.height / 2 + 50);

  if (breakTime <= 0) {
    ctx.fillText("Press Space to continue", canvas.width / 2, canvas.height / 2 + 100);
  }
}

// Draw the break info
function drawFinishedInfo() {
  // Reset the position, velocity and acceleration
  circle.x = canvas.width / 2;
  circle.y = canvas.height / 2;
  circle.vx = 0;
  circle.vy = 0;
  circle.ax = 0;
  circle.ay = 0;

  ctx.fillStyle = "white";
  ctx.font = "24px Arial";
  ctx.textAlign = "center";
  ctx.fillText(`Time needed to deliver all pizzas: ${formatTime(bestTime.slice(-1))}`, canvas.width / 2, canvas.height / 2 - 50);
  ctx.fillText(`Your fastest deliver time this session: ${formatTime(Math.min(...bestTime))}`, canvas.width / 2, canvas.height / 2);
  ctx.fillText(`You finished all blocks for today. See you tomorrow!`, canvas.width / 2, canvas.height / 2 + 50);

}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function startTimer() {
  timerInterval = setInterval(function() {
    const currentTime = new Date().getTime();
    elapsedTime = Math.floor((currentTime - blockStartTime) / 1000); // Calculate elapsed time in seconds
    timerDisplay.textContent = `Time: ${formatTime(elapsedTime)}`; // Update the timer display
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval); // This will stop the timer
  bestTime.push(elapsedTime);
  timerInterval = null; // Reset interval
  timerDisplay.textContent = `Time: ${formatTime(elapsedTime)}`; // Update the timer display
  elapsedTime = 0; // Reset elapsed time
}


// The main game loop
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  frameCount += 1;
  // Only add data if car moved

  if (!onBreak) {
    // Update circle's velocity and position based on acceleration and friction
    circle.vx += circle.ax;
    circle.vy += circle.ay;
    circle.vx *= circle.friction;
    circle.vy *= circle.friction;

    // Calculate the current velocity magnitude (speed)
    let velocityMagnitude = Math.sqrt(circle.vx * circle.vx + circle.vy * circle.vy);

    // If the current velocity is greater than the max velocity, normalize it and then multiply by max velocity
    if (velocityMagnitude > circle.maxVelocity)
    {
        let ratio = circle.maxVelocity / velocityMagnitude;
        circle.vx *= ratio;
        circle.vy *= ratio;
    }


    angle_rad =  Math.atan2(circle.vy, circle.vx);
    circle.x += circle.vx;
    circle.y += circle.vy;

    data.push({
      frame: frameCount,
      cursorPositionX: circle.x,
      cursorPositionY: circle.y ,
      targetPositionX:target.x,
      targetPositionY: target.y,
      targetNumber: trials,
      blockNumber: blockScores.length,
      identifier: identifier,
      canvasWidth: canvas.offsetWidth,
      canvasHeight: canvas.offsetHeight
  });
  }



  if (onBreak) {
    if (blockScores.length > maxBlocks) {
      drawFinishedInfo();
    }
    else {
      drawBreakInfo();
      }
  } else {
      if (trials >= maxTrials) {
          window.removeEventListener("keydown", handleKeyDown);
          window.removeEventListener("keyup", handleKeyUp);
          startBreak();
        }
      if (breakTime < breakDuration) {
          drawBreakInfo();
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Update circle position based on pressed keys and current mapping
          const mapping = mappings[currentMapping];
          if (keys['w']) moveCircle(mapping.w);
          if (keys['s']) moveCircle(mapping.s);
          if (keys['j']) moveCircle(mapping.j);
          if (keys['l']) moveCircle(mapping.l);

          keepCircleInBounds();
          collectPizza();
          drawCar();
          drawTarget();
      }
  }
  requestAnimationFrame(update);
}

// Handle a mouse click on the canvas to start the game loop.
canvas.addEventListener('click', function(event) {
  // Here, we scale the mouse coordinates from the event's clientX and clientY
  // to match the actual canvas size, which can differ due to CSS styling.
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x = (event.clientX - rect.left) * scaleX;
  const y = (event.clientY - rect.top) * scaleY;

  // Check if the click is within the bounds of the Start Game button.
  if (!gameStarted && x >= canvas.width / 2 - 50 && x <= canvas.width / 2 + 50 && y >= canvas.height / 2 + 120 && y <= canvas.height / 2 + 170) {
    gameStarted = true;
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    setTargetPosition();
    update();
    blockStartTime = new Date().getTime();
    startTimer();
  }
});

// Send the data to the server
function sendPizzaDataToServer(data) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/save_pizza_data', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(data));
}

// Start the first screen. Draw the instructions on the canvas.
drawInstructions();

window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);