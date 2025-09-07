import { Direction, PlayerConstructor } from './types';

const initialGrid: [number, number] = [25, 25];
const initialSpeed = 125;

export class Game {
  public static rows: number;
  public static columns: number;
  public static cells: number;
  public static speed: number = 125;
  public food: number = 0;
  public static keystrokes: number[] = [];
  public static timer: NodeJS.Timeout | null = null;
  public static running: boolean = false;
  public gameOver: boolean = false;
  public score: number = 0;
  public snake: number[] = [];
  public static direction: Direction = 'up';

  constructor({ grid, speed }: PlayerConstructor = {
    grid: initialGrid,
    speed: initialSpeed,
  }) {
    const [rows, columns] = grid ?? initialGrid;
    Game.rows = rows;
    Game.columns = columns;
    Game.cells = Game.rows * Game.columns;
    Game.speed = speed ?? initialSpeed;
  }

  public addKeystroke(time: number): void {
    Game.keystrokes.push(time);
  }

  public lastKeystroke(): number {
    return Game.keystrokes.pop() ?? Date.now() - Game.speed;
  }

  public initialize() {
    const midpoint = Math.floor(Game.rows / 2) *
      Game.columns -
      Math.ceil(Game.columns / 2);
    const head = midpoint - Game.columns;
    const body = midpoint;
    const tail = midpoint + Game.columns;
    const initial = [head, body, tail];

    this.snake = initial;
  }

  public togglePlaying(end?: boolean) {
    Game.running = !Game.running;

    if (end) {
      this.gameOver = true;

      // gameover visuals
    } else if (!Game.running) {
      // pause visuals
    } else if (!Game.timer) {
      // new game
      // init()
      // play visuals
    }

    if (Game.timer && end) {
      clearInterval(Game.timer);
      Game.timer = null;
    } else {
      Game.timer = setInterval(() => {
        this.move();
        // this.draw()
      }, Game.speed);
    }
  }

  public eat() {
    const tail = this.snake[this.snake.length - 1];
    this.snake.push(tail);
  }

  public move() {
    const index = this.nextIndex();
    const viable = this.viability(index);

    if (viable) {
      this.snake.pop();
      this.detectCollision(index)
      this.snake.unshift(index);
    } else {
      this.togglePlaying(true);
    }
  }

  private nextIndex(): number {
    const head = this.snake[0];
    const directionalIndexes = {
      up: head - Game.columns,
      down: head + Game.columns,
      left: head - 1,
      right: head + 1,
    };
    return directionalIndexes[Game.direction];
  }

  viability(index: number): boolean {
    const head = this.snake[0];
    const viabilityIndexes = {
      up: head > Game.columns - 1 &&
        !this.snake.includes(index),
      down: head < Game.cells - Game.columns &&
        !this.snake.includes(index),
      left: head % Game.columns > 0 &&
        !this.snake.includes(index),
      right: head % Game.columns < Game.columns - 1 &&
        !this.snake.includes(index),
    };
    return viabilityIndexes[Game.direction];
  }

  private dropFood(): void {
    const index = Math.floor(Math.random() * Game.cells);

    if (this.snake.includes(index)) {
      return this.dropFood();
    } else {
      this.food = index;
    }
  }

  private detectCollision(head: number): void {
    const directionalCollisions = {
      up: head < 0,
      down: head > Game.cells - 1,
      left: head % Game.columns < 0,
      right: head % Game.columns === Game.columns,
    };

    if (directionalCollisions[Game.direction]) {
      this.togglePlaying(true);
    } else if (head == this.food) {
      const tail = this.snake[this.snake.length - 1];
      this.snake.push(tail);
      this.score += 10;
      // update score dom
      this.dropFood();
    }
  }
}

export const game = new Game();
