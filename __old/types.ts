import crypto from 'crypto';

export type UpdateCallback<T = any> = (value?: T) => T;
export type StateEntry<T = any> = {
  index: number;
  value: T;
  update: (value: T | UpdateCallback) => void;
};
export type UseState<T = any> = [T, (value: T | UpdateCallback) => void];
export type RenderProps = {
  useState: <T = any>(value: T) => UseState<T>;
};

// game
export interface GameCtx {
  // player
  direction: string;
  player: number[];

  // state
  running: boolean;
  score: number;
  gameOver: boolean;
  food: number;

  // settings
  speed: number;
  columns: number;
  rows: number;
  cells: number;

  // dom
  dom: {
    // layout
    root: Document;
    container: HTMLDivElement;

    // controls
    pause: HTMLButtonElement;
    start: HTMLButtonElement;

    // interface
    overlay: HTMLDivElement;
    score: HTMLDivElement;
  };
}
