// Homework(part 2)
const gmailInput = document.querySelector("#gmail_input");
const gmailButton = document.querySelector("#gmail_button");
const gmailResult = document.querySelector("#gmail_result");

const gmailRegExp = /^[a-zA-Z0-9._-]+@gmail\.com$/;

gmailButton.addEventListener("click", () => {
  if (gmailRegExp.test(gmailInput.value)) {
    gmailResult.innerHTML = "OK";
    gmailResult.style.color = "green";
  } else {
    gmailResult.innerHTML = "NOT OK";
    gmailResult.style.color = "red";
  }
});

// 1.2
const parentBlock = document.querySelector(".parent_block");
const childBlock = document.querySelector(".child_block");
let positionX = 0;
let positionY = 0;
const MaxWidthx = 449;

let moveChildBlock = () => {
  if (positionX <= MaxWidthx && positionY === 0) {
    positionX++;
    childBlock.style.left = `${positionX}px`;
  } else if (positionX >= MaxWidthx && positionY <= MaxWidthx) {
    positionY++;
    childBlock.style.top = `${positionY}px`;
  } else if (positionX >= 1 && positionY >= MaxWidthx) {
    positionX--;
    childBlock.style.left = `${positionX}px`;
  } else if (positionX >= 0 && positionY > 0) {
    positionY--;
    childBlock.style.top = `${positionY}px`;
  }
  setTimeout(moveChildBlock, 5);
};

moveChildBlock();

// Секундомер
// Секундомер
let secondsValue = 0;
let interval;

const secondsElement = document.getElementById("seconds");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");

const updateSeconds = () => {
  secondsValue++;
  secondsElement.textContent = secondsValue;
};

startButton.addEventListener("click", () => {
  if (!interval) {
    interval = setInterval(updateSeconds, 1000);
    startButton.disabled = true;
    stopButton.disabled = false;
    resetButton.disabled = false;
  }
});

stopButton.addEventListener("click", () => {
  clearInterval(interval);
  interval = null;
  startButton.disabled = false;
  stopButton.disabled = true;
});

resetButton.addEventListener("click", () => {
  clearInterval(interval);
  interval = null;
  secondsValue = 0;
  secondsElement.textContent = secondsValue;
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = true;
});
