import {
  DomState,
  GameState,
  PlayerState,
  SettingsState
} from './gametypes';

export const playerState: PlayerState = {
  player: [],
  direction: 'up',
  lastPlayer: 0,
};

export const settingsState: SettingsState = {
  speed: 125,
  columns: 25,
  rows: 25,
  cells: 625,
};

export const gameState: GameState = {
  grid: Array(settingsState.cells).fill(0),
  running: false,
  score: 0,
  gameOver: false,
  food: 0,
  timer: null,
};

export const domState: DomState = {
  root: document.querySelector(':root') as HTMLElement,
  container: document.getElementById('container') as HTMLDivElement,
  pause: document.getElementById('pause-button') as HTMLButtonElement,
  play: document.getElementById('play-button') as HTMLButtonElement,
  overlay: document.getElementById('overlay') as HTMLDivElement,
  score: document.getElementById('score') as HTMLDivElement,
};
