export type Direction = 'up' | 'down' | 'left' | 'right';
export type PlayerConstructor = {
  grid?: [number, number];
  speed?: number;
};
export type Elements = {
  overlay: HTMLDivElement;
  gameboard: HTMLDivElement;
  startButton: HTMLButtonElement;
  pauseButton: HTMLButtonElement;
  score: HTMLHeadingElement;
};
