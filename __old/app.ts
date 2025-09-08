import { Direction } from './gametypes';
import {
  domState,
  gameState,
  playerState,
  settingsState,
} from './states';

function initializePlayer(initialDirection: Direction = 'up') {
  const { rows, columns } = settingsState;
  const { player } = playerState;

  const midpoint = Math.floor(rows / 2) * columns - Math.ceil(columns / 2);
  //head
  const head = midpoint - columns;
  const body = midpoint;
  const tail = midpoint + columns;
  const initial = [head, body, tail];

  // reset player if necessary
  if (player.length) {
    playerState.player = [];
  }

  initial.forEach((item) => playerState.player.push(item));
  gameState.grid.fill(0);
  playerState.direction = initialDirection;
  playerState.lastPlayer = playerState.player[playerState.player.length - 1];

  dropFood();
  // draw()

  // startGame();
}

// collision detection
function detectCollision(head: number): void {
  const { direction, lastPlayer } = playerState;
  const { food } = gameState;
  const { cells, columns, rows } = settingsState;
  const { score } = domState;

  const collision = {
    up: head < 0,
    down: head > cells - 1,
    left: head % columns < 0,
    right: head % columns === columns,
  };

  if (collision[direction]) {
    // endGame()
  } else if (head === food) {
    playerState.player.push(lastPlayer);
    gameState.score += 10;
    score.textContent = gameState.score.toString();
    dropFood();
  }
}

// start game
function startGame() {
  gameState.running = true;
  domState.pause.textContent = 'Pause';

  // toggleOverlay()
  // toggleButtons()
  gameState.timer = setInterval(() => {
    // move()
    // draw()
  }, settingsState.speed);
}

// end game 
function endGame() {
  const { play } = domState;
  const { timer } = gameState;
  gameState.running = false;
  gameState.gameOver = true;

  // toggleButtons()
  // toggleOverlay()
  if (timer) {
    clearInterval(timer);
    gameState.timer = null;
    console.log('game over');
    play.innerText = 'Play again';
  }
}

// place food
function dropFood() {
  const { cells } = settingsState;
  const { player } = playerState;
  const foodIndex = Math.floor(Math.random() * cells);

  if (player.includes(foodIndex)) {
    return dropFood();
  } else {
    gameState.food = foodIndex;
  }
}
