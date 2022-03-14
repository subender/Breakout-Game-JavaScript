const grid = document.querySelector(".grid");
const scoreEl = document.querySelector(".score");
const blockWidth = 13;
const blockHeight = 3;
const boardWidth = 72;
const boardHeight = 50;
const ballDiameter = 2;
let timerId;
const userStartPosition = [29, 1];
const ballStartPosition = [34, 5];
let ballCurrentPosition = ballStartPosition;
let userCurrentPosition = userStartPosition;
let xDirection = -0.2;
let yDirection = 0.2;
let score = 0;

class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.bottomRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}

const blocksArray = [
  new Block(1, 46),
  new Block(15, 46),
  new Block(29, 46),
  new Block(43, 46),
  new Block(58, 46),
  new Block(1, 42),
  new Block(15, 42),
  new Block(29, 42),
  new Block(43, 42),
  new Block(58, 42),
  new Block(1, 38),
  new Block(15, 38),
  new Block(29, 38),
  new Block(43, 38),
  new Block(58, 38),
];

function createBlocks() {
  for (let i = 0; i < blocksArray.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.left = blocksArray[i].bottomLeft[0] + "rem";
    block.style.bottom = blocksArray[i].bottomLeft[1] + "rem";
    grid.appendChild(block);
  }
}

createBlocks();

//Draw User

function drawUser() {
  user.style.left = userCurrentPosition[0] + "rem";
  user.style.bottom = userCurrentPosition[1] + "rem";
}

//Draw Ball
function drawBall() {
  ball.style.left = ballStartPosition[0] + "rem";
  ball.style.bottom = ballStartPosition[1] + "rem";
}

//Creating user

const user = document.createElement("div");
user.classList.add("user");
drawUser();
grid.appendChild(user);

//move user

function moveUser(e) {
  console.log(e.key);
  switch (e.key) {
    case "ArrowLeft":
      if (userCurrentPosition[0] >= 1) {
        userCurrentPosition[0] -= 1;
        drawUser();
      }
      break;

    case "ArrowRight":
      if (userCurrentPosition[0] < boardWidth - blockWidth - 0.5) {
        userCurrentPosition[0] += 1;
        drawUser();
      }
      break;
  }
}

//listning for a  key press in the document
document.addEventListener("keydown", moveUser);

// create ball

const ball = document.createElement("div");
ball.classList.add("ball");
drawBall();
grid.appendChild(ball);

// Ball Movement

function moveBall() {
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;
  drawBall();
  checkForCollisions();
}

timerId = setInterval(moveBall, 30);

//Checks for collisions

function checkForCollisions() {
  // Blocks collision

  for (let i = 0; i < blocksArray.length; i++) {
    if (
      ballCurrentPosition[0] > blocksArray[i].bottomLeft[0] &&
      ballCurrentPosition[0] < blocksArray[i].bottomRight[0] &&
      ballCurrentPosition[1] + ballDiameter > blocksArray[i].bottomLeft[1] &&
      ballCurrentPosition[1] < blocksArray[i].topLeft[1]
    ) {
      const allBlocks = Array.from(document.querySelectorAll(".block"));
      allBlocks[i].classList.remove("block");
      allBlocks.splice(i, 1);
      changeDirection();
      score++;
      scoreEl.innerHTML = score;

      // check for win

      if (score === 15) {
        scoreEl.innerHTML = "You Win!";
        clearInterval(timerId);
        document.removeEventListener("keydown", moveUser);
      }
    }
  }

  //Check for user collision

  if (
    ballCurrentPosition[0] > userCurrentPosition[0] &&
    ballCurrentPosition[0] < userCurrentPosition[0] + blockWidth &&
    ballCurrentPosition[1] > userCurrentPosition[1] &&
    ballCurrentPosition[1] < userCurrentPosition[1] + blockHeight
  ) {
    changeDirection();
  }
  if (
    ballCurrentPosition[0] > boardWidth - ballDiameter ||
    ballCurrentPosition[1] >= boardHeight - ballDiameter ||
    ballCurrentPosition[0] <= 0
  ) {
    //wall collisions
    changeDirection();
  }

  if (ballCurrentPosition[1] <= 0) {
    clearInterval(timerId);
    scoreEl.innerHTML = "You Lose!!";
    document.removeEventListener("keydown", moveUser);
  }
}

function changeDirection() {
  if (xDirection === 0.2 && yDirection === 0.2) {
    yDirection = -0.2;
    return;
  }

  if (xDirection === 0.2 && yDirection === -0.2) {
    xDirection = -0.2;
    return;
  }

  if (xDirection === -0.2 && yDirection === -0.2) {
    yDirection = 0.2;
    return;
  }

  if (xDirection === -0.2 && yDirection === 0.2) {
    xDirection = 0.2;
    return;
  }
}
