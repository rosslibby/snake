export type Direction = 'up' | 'down' | 'left' | 'right';

export type PlayerState = {
  direction: Direction
  player: number[];
  lastPlayer: number;
};

export type GameState = {
  grid: number[];
  running: boolean;
  score: number;
  gameOver: boolean;
  food: number;
  timer: NodeJS.Timeout | null;
};

export type SettingsState = {
  speed: number;
  columns: number;
  rows: number;
  cells: number;
}

export type DomState = {
  // layout
  root: HTMLElement;
  container: HTMLDivElement;

  // controls
  pause: HTMLButtonElement;
  play: HTMLButtonElement;

  // interface
  overlay: HTMLDivElement;
  score: HTMLDivElement;
}
