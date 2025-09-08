import { GameCtx, UpdateCallback, UseState } from './types';

class Game {
  // player
  public static direction: string = 'up';
  public static player: number[] = [];

  // state
  public static running: boolean = false;
  public static score: number = 0;
  public static gameOver: boolean = false;
  public static food: number = 0;

  // setting
  public static speed: number = 125;
  public static columns: number = 25;
  public static rows: number = 25;
  public static cells: number = Game.rows * Game.columns;

  public getValue(key: keyof typeof Game) {
    return Game[key];
  }

  // public update<T = any>(key: keyof typeof Game, value: T) {
  //   const current = Game[key];
  //   if (current) {
  //     Game.running = value as typeof Game;
  //   }
  //   Game[key] = value;
  // }
}

const setRunning = (value: boolean | ((value: boolean) => boolean)) => {
  if (typeof value === 'function') {
    Game.running = value(Game.running);
  } else {
    Game.running = value;
  }
};
const setState = (
  key: keyof typeof Game,
  value: any,
): void => {
  const current = Game[key];
  if (typeof value === 'function') {
    Game.running = value(current);
  } else {
    if (Game[key]) {
      Game[key] = value as typeof Game;
    } = value as any;
  }
}
const update = <T = any>(value: T | UpdateCallback) => {}
const useState: UseState = <T = any>(): [T, ()] => {};
const game = new Game();
console.log(Game);
console.log(game.getValue('running'))
setRunning((prev) => !prev);
console.log(game.getValue('running'));
setRunning((prev) => !prev);
console.log(game.getValue('running'));
