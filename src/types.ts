export type Direction = 'up' | 'down' | 'left' | 'right';
export type PlayerConstructor = {
  grid?: [number, number];
  speed?: number;
};
export type Elements = {
  overlay: HTMLDivElement;
  gameboard: HTMLDivElement;
  startButton: HTMLButtonElement;
  pauseButton: HTMLButtonElement;
  score: HTMLHeadingElement;
};
export type AdditionalElementCreationOptions = {
  className?: string;
  id?: string;
  dataset?: Record<string, string>;
  children?: HTMLElement | HTMLElement[];
  parent?: string | HTMLElement;
  text?: string;
};
export type CreateElementOptions = ElementCreationOptions &
  AdditionalElementCreationOptions;
export type TreeNode = {
  className?: string;
  id?: string;
  dataset?: Record<string, string>;
  children?: TreeNode | TreeNode[];
  parent?: string | HTMLElement;
  tagName: keyof HTMLElementTagNameMap;
  text?: string;
};
