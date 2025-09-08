import { CreateElementOptions, TreeNode } from '@/types';

export const elements: Record<string, HTMLElement> = {};
export function createElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  options: CreateElementOptions,
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

export function domFromTree<K extends keyof HTMLElementTagNameMap>(
  { tagName, children, ...rest }: TreeNode,
): HTMLElementTagNameMap[K] {
  if (children) {
    children = Array.isArray(children) ? children : [children];
  }

  return createElement(tagName, {
    ...rest,
    children: children?.map(domFromTree),
  }) as HTMLElementTagNameMap[K];
}
