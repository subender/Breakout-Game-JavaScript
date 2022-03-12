const grid = document.querySelector(".grid");
const blockWidth = 13;
const blockHeight = 3;
const boardWidth = 72;
const userStartPosition = [29, 1];
let userCurrentPosition = userStartPosition;

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

//Creating user

const user = document.createElement("div");
user.classList.add("user");
drawUser();
grid.appendChild(user);
