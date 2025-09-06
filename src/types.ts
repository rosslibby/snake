export type UpdateCallback<T = any> = (value?: T) => T;
export type StateEntry<T = any> = {
  index: number;
  value: T;
  update: (value: T | UpdateCallback) => void;
};
export type UseState<T = any> = [T, (value: T | UpdateCallback) => void];
export type RenderProps = {
  useState: <T = any>(value: T) => UseState<T>;
};

// context api
export type Context = Record<string, any>;
export interface GameCtx {
  running: boolean;
  score: number;
  gameOver: boolean;
  _: Record<string, any>;
}
