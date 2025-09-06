import { Framework } from './framework';
import { RenderProps } from './types';

class Game extends Framework {
  render({ useState }: RenderProps) {
    const [running, setRunning] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [last, setLast] = useState<number[]>([]);
    const [piece, setPiece] = useState<number>(0);
    const [direction, setDirection] = useState<string>('up');
    const [keystrokes, setKeystrokes] = useState<number[]>([]);
  }
}

const game = new Game();

const { useState } = game.utils;
