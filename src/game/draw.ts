import { Game, game } from './player';

const grid = Array.from({ length: Game.cells }, (_, i) => i);
const container = makeContainer();

function makeContainer() {
  const el = document.createElement('div');
  el.classList.add('container');
  document.body.appendChild(el);
  return el;
}

function render() {
  const player = game.snake;
  const food = game.food;

  if (Game.running) {
    Array.from(container.querySelectorAll('.cell'))
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
    resetGrid(container);
    makeCells(container);
  }
}

function resetGrid(container: HTMLDivElement) {
  container.innerHTML = '';
}

function makeInnerCell(outer: HTMLDivElement) {
  const inner = document.createElement('div');
  inner.classList.add('block-inner');
  outer.appendChild(inner);
}

function makeCell(id: number, container: HTMLDivElement) {
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

  container.appendChild(outer);
}

function makeCells(container: HTMLDivElement) {
  grid.forEach((i) => makeCell(i, container));
}

function styleRoot() {
  const root = document.querySelector(':root') as HTMLElement;

  if (root) {
    root.style.setProperty('--columns', Game.columns.toString());
    root.style.setProperty('--rows', Game.rows.toString());
  }
}

document.body.onload = () => styleRoot();
