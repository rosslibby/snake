type GameBoard = {
  rows: number;
  columns: number;
};

export const playerState = {
  initialDirection: 'up',
};
export const gameboard = {
  rows: 25,
  columns: 25,
};

const MS = 125
const INITIAL_DIRECTION = 'up'
const COLUMNS = 25
const ROWS = 25
const CELLS = COLUMNS * ROWS
const INITIAL_PLAYER = [
  (Math.floor(ROWS / 2) * COLUMNS - Math.ceil(COLUMNS / 2)) - COLUMNS,   // head
  Math.floor(ROWS / 2) * COLUMNS - Math.ceil(COLUMNS / 2),   // midpoint
  (Math.floor(ROWS / 2) * COLUMNS - Math.ceil(COLUMNS / 2)) + COLUMNS,   // tail
]
const CONTAINER = document.getElementById('game')
const ROOT = document.querySelector(':root')
const PAUSE = document.getElementById('pause-button')
const START = document.getElementById('start-button')
const OVERLAY = document.getElementById('overlay')
const SCORE = document.getElementById('score')
const player: number[] = [];
const state = {
  lost: false,
  paused: false,
  timer: null,
  running: false,
  last: player[player.length - 1],
  score: 0,
  piece: 0,
  direction: INITIAL_DIRECTION,
}
