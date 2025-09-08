import { Direction } from './types';
import { Game, game } from './player';

function handleKeys(e: KeyboardEvent) {
  if (
    (!Game.running && ['Enter', ' '].includes(e.key)) ||
    (Game.running && e.key === 'Escape')
  ) {
    game.togglePlaying();
  }

  const direction = e.key.substring(5).toLowerCase();

  if (
    (
      ['up', 'down'].includes(direction) &&
      !['up', 'down'].includes(Game.direction)
    ) ||
    (
      ['left', 'right'].includes(direction) &&
      !['left', 'right'].includes(Game.direction)
    )
  ) {
    if (!Game.running) {
      game.togglePlaying();
    }

    const keystrokeTime = Date.now();
    const lastKeystroke = game.lastKeystroke();
    game.addKeystroke(keystrokeTime);

    const keystrokeDiff = keystrokeTime - lastKeystroke;
    const wait = Math.max(Game.speed - keystrokeDiff, 0);

    setTimeout(() => {
      Game.direction = direction as Direction;
    }, wait);
  }
}

document.addEventListener('keydown', handleKeys);
