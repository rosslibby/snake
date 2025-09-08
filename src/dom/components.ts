import { createElement } from './utils';

createElement('main', {
  children: [
    makeScore(),
    makeWrapper(),
  ],
  parent: 'body',
});

function makeWrapper() {
  return createElement('div', {
    className: 'wrapper',
    children: [
      makeOverlay(),
      makeGameboard(),
    ],
  });
}

function makeOverlay(): HTMLElement {
  return createElement('div', {
    className: 'overlay',
    id: 'overlay',
    children: makeButtons(),
  });
};

function makeGameboard() {
  return createElement('div', {
    className: 'gameboard',
    id: 'gameboard',
  });
};

function makeButtons() {
  const start = createElement('button', {
    className: 'button',
    id: 'start-button',
    text: 'Play',
  });
  const pause = createElement('button', {
    className: 'button button--hidden',
    id: 'pause-button',
    text: 'Pause',
  });
  return [start, pause];
};

function makeScore() {
  return createElement('h2', {
    className: 'score',
    id: 'score',
    text: '0',
  });
}
