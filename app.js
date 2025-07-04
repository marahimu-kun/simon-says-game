let gameSeq = [];
let userSeq = [];

let btns = ["red", "blue", "pink", "yellow"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let allBtns = document.querySelectorAll(".btn");

let hiScr = 13;
if (hiScr < level) {
  hiScr = level;
}

// Start game on keypress (for desktop)
document.addEventListener("keypress", function () {
  if (started == false) {
    startGame();
  }
});

// Start game on touch (for mobile)
document.addEventListener("touchstart", function () {
  if (started == false) {
    startGame();
  }
});

function startGame() {
  console.log("Game Started!");
  started = true;
  levelUp();
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  gameSeq.push(randColor);
  console.log(gameSeq);
  gameFlash(randBtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! <br> Your score was <b>${level}</b> <br> High Score is ${hiScr} <br> Tap anywhere or press any key to restart`;
    document.querySelector("body").classList.add("game-over");
    setTimeout(function () {
      document.querySelector("body").classList.remove("game-over");
    }, 500);
    reset();
  }
}

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 500);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 500);
}

function btnPress() {
  let btn = this;
  userFlash(btn);
  userColor = btn.getAttribute("id");
  userSeq.push(userColor);
  checkAns(userSeq.length - 1);
}

for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
