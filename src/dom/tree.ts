import { TreeNode } from '@/types';

export const domTree: TreeNode = {
  tagName: 'main',
  children: [
    {
      tagName: 'h2',
      className: 'score',
      id: 'score',
      text: '0',
    },
    {
      tagName: 'div',
      className: 'wrapper',
      children: [
        {
          tagName: 'div',
          className: 'overlay',
          id: 'overlay',
          children: [
            {
              className: 'button',
              id: 'start-button',
              tagName: 'button',
              text: 'Play',
            },
            {
              className: 'button button--hidden',
              id: 'pause-button',
              tagName: 'button',
              text: 'Pause',
            },
          ],
        },
        {
          tagName: 'div',
          className: 'gameboard',
          id: 'gameboard',
        },
      ],
    },
  ],
  parent: 'body',
};
