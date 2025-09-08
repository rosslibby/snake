import { Elements } from './types';
import { elements } from './dom';
import { Game, game } from './player';

const { gameboard } = elements as Elements;

const grid = Array.from({ length: Game.cells }, (_, i) => i);

function render() {
  const player = game.snake;
  const food = game.food;

  if (Game.running) {
    Array.from(gameboard.querySelectorAll('.cell'))
      .forEach((cell) => {
        const id = Number(cell.id);

        cell.classList.toggle('player', player.includes(id));
        cell.classList.toggle('player--head', id === player[0]);
        cell.classList.toggle('food', id === food);
        cell.classList.toggle('block-outer', id === food);

        if (id === food && !cell.querySelector('.block-inner')) {
          makeInnerCell(cell as HTMLDivElement);
        }

        if (id !== food && cell.querySelector('.block-inner')) {
          cell.removeChild(cell.querySelector('.block-inner') as HTMLDivElement);
        }
      });
  } else {
    resetGrid(gameboard);
    makeCells(gameboard);
  }
}

function resetGrid(gameboard: HTMLDivElement) {
  gameboard.innerHTML = '';
}

function makeInnerCell(outer: HTMLDivElement) {
  const inner = document.createElement('div');
  inner.classList.add('block-inner');
  outer.appendChild(inner);
}

function makeCell(id: number, gameboard: HTMLDivElement) {
  const player = game.snake;
  const food = game.food;

  const outer = document.createElement('div');
  outer.id = id.toString();
  outer.classList.add('cell');
  outer.classList.toggle('block-outer', id === food);
  outer.classList.toggle('player', player.includes(id));
  outer.classList.toggle('food', id === food);

  if (id === food) {
    makeInnerCell(outer);
  }

  gameboard.appendChild(outer);
}

function makeCells(gameboard: HTMLDivElement) {
  grid.forEach((i) => makeCell(i, gameboard));
}

function styleRoot() {
  const root = document.querySelector(':root') as HTMLElement;

  if (root) {
    root.style.setProperty('--columns', Game.columns.toString());
    root.style.setProperty('--rows', Game.rows.toString());
  }
}

document.body.onload = () => styleRoot();
