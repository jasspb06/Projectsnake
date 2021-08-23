const context = canvas.getContext("2d");
                
class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

let speed = 6;

let grid = 20;
let gridSize = canvas.width / grid - 2;

let snakeX = 10;
let snakeY = 10;
const cells = [];
let maxCells = 1;

let appleX = 5;
let appleY = 5;

let inputsXVelocity = 0;
let inputsYVelocity = 0;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;



//game loop
function drawGame() {
  xVelocity = inputsXVelocity;
  yVelocity = inputsYVelocity;

  changeSnakePosition();
  let result = isGameOver();
  if (result) {
    return;
  }

  clearRect();

  checkAppleCollision();
  drawApple();
  forEach();

  drawScore();

  if (score > 5) {
    speed = 9;
  }
  if (score > 10) {
    speed = 11;
  }

  setTimeout(drawGame, 1000 / speed);
}

function isGameOver() {
  let gameOver = false;

  if (yVelocity === 0 && xVelocity === 0) {
    return false;
  }

  //walls
  if (snakeX < 0) {
    gameOver = true;
  } else if (snakeX === grid) {
    gameOver = true;
  } else if (snakeY < 0) {
    gameOver = true;
  } else if (snakeY === grid) {
    gameOver = true;
  }

  for (let i = 0; i < cells.length; i++) {
    let part = cells[i];
    if (part.x === snakeX && part.y === snakeY) {
      gameOver = true;
      break;
    }
  }

  if (gameOver) {
    context.fillStyle = "white";
    context.font = "50px Verdana";

    if (gameOver) {
      context.fillStyle = "white";
      context.font = "50px Verdana";

      var gradient = context.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop("0", " magenta");
      gradient.addColorStop("0.5", "blue");
      gradient.addColorStop("1.0", "red");
      
      context.fillStyle = gradient;

      context.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
    }

    context.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
  }

  return gameOver;
}

function drawScore() {
  context.fillStyle = "white";
  context.font = "10px Verdana";
  context.fillText("Score " + score, canvas.width - 50, 10);
}

function clearRect() {
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function forEach() {
  context.fillStyle = "green";
  for (let i = 0; i < cells.length; i++) {
    let part = cells[i];
    context.fillRect(part.x * grid, part.y * grid, gridSize, gridSize);
  }

  cells.push(new SnakePart(snakeX, snakeY)); 
  while (cells.length > maxCells) {
    cells.shift(); 
  }

  context.fillStyle = "orange";
  context.fillRect(snakeX * grid, snakeY * grid, gridSize, gridSize);
}

function changeSnakePosition() {
  snakeX = snakeX + xVelocity;
  snakeY = snakeY + yVelocity;
}

function drawApple() {
  context.fillStyle = "red";
  context.fillRect(appleX * grid, appleY * grid, gridSize, gridSize);
}

function checkAppleCollision() {
  if (appleX === snakeX && appleY == snakeY) {
    appleX = Math.floor(Math.random() * grid);
    appleY = Math.floor(Math.random() * grid);
    maxCells++;
    score++;
    
  }
}

document.body.addEventListener("keydown", e);

function e(event) {
  //up
  if (event.keyCode == 38 || event.keyCode == 87) {
    //87 is w
    if (inputsYVelocity == 1) return;
    inputsYVelocity = -1;
    inputsXVelocity = 0;
  }

  //down
  if (event.keyCode == 40 || event.keyCode == 83) {
    // 83 is s
    if (inputsYVelocity == -1) return;
    inputsYVelocity = 1;
    inputsXVelocity = 0;
  }

  //left
  if (event.keyCode == 37 || event.keyCode == 65) {
    // 65 is a
    if (inputsXVelocity == 1) return;
    inputsYVelocity = 0;
    inputsXVelocity = -1;
  }

  //right
  if (event.keyCode == 39 || event.keyCode == 68) {
    //68 is d
    if (inputsXVelocity == -1) return;
    inputsYVelocity = 0;
    inputsXVelocity = 1;
  }
}

drawGame();
