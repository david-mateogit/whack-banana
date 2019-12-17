const bowls = document.querySelectorAll('div.bowl');
const scoreBoard = document.querySelector('span.badge');
const bananas = document.querySelectorAll('div.banana');
const start = document.querySelector('button#start');
const timeUpDiv = document.querySelector('div.timeup');

let lastBowl;
let score;
let timeUp = false;

function randomTime(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomBowl(bowls) {
  const bowlIndex = Math.floor(Math.random() * bowls.length);
  const bowl = bowls[bowlIndex];

  if (bowl === lastBowl) {
    return randomBowl(bowls);
  }

  lastBowl = bowl;
  return bowl;
}

function show() {
  const time = randomTime(900, 3000);
  const bowl = randomBowl(bowls);

  bowl.classList.add('show');
  setTimeout(() => {
    bowl.classList.remove('show');
    if (!timeUp) show();
  }, time);
}

function whack(e) {
  score++;
  this.parentElement.classList.remove('show');
  scoreBoard.textContent = score;
}

bananas.forEach(banana => banana.addEventListener('click', whack));

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  timeUpDiv.classList.add('d-none');
  start.classList.add('none');
  show();
  setTimeout(() => {
    timeUp = true;
    timeUpDiv.classList.remove('d-none');
    start.classList.remove('none');
  }, 15000);
}

start.addEventListener('click', startGame);
