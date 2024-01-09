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

// 2-задание
const parentBlock = document.querySelector(".parent_block");
const childBlock = document.querySelector(".child_block");

const moveRight = (position) => {
  if (position < 449) {
    childBlock.style.left = `${position}px`;
    requestAnimationFrame(() => moveRight(position + 1));
  }
};

// Вызов функции для начала движения
requestAnimationFrame(() => moveRight(0));
