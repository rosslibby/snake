export type UpdateCallback<T = any> = (value?: T) => T;
export type StateEntry<T = any> = {
  index: number;
  value: T;
  update: (value: T | UpdateCallback) => void;
};
export type UseState<T = any> = [T, (value: T | UpdateCallback) => void];
