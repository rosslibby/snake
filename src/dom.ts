export const elements: Record<string, HTMLElement> = {};

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

function createElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  options: ElementCreationOptions & {
    className?: string;
    id?: string;
    dataset?: Record<string, string>;
    children?: HTMLElement | HTMLElement[];
    parent?: string | HTMLElement;
    text?: string;
  } = {},
): HTMLElementTagNameMap[K] {
  const { children, className, dataset, id, parent, text, ...rest } = options;
  const el = document.createElement(tagName, rest);

  if (className) {
    el.className = className;
  }

  if (dataset) {
    Object.entries(dataset).forEach(([key, value]) => {
      el.setAttribute(`data-${key}`, value);
    });
  }

  if (text) {
    el.textContent = text;
  }

  if (children) {
    if (Array.isArray(children)) {
      children.forEach((child) => el.appendChild(child));
    } else {
      el.appendChild(children);
    }
  }

  if (parent) {
    const parentEl = typeof parent === 'string'
      ? document.querySelector(parent) as HTMLElement
      : parent;

    parentEl.appendChild(el);
  }

  if (id) {
    el.id = id;
    elements[id] = el as HTMLElementTagNameMap[K];
  }

  return el;
}
