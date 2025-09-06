import crypto from 'crypto';

type UpdateCallback = <T = any>(value?: T) => T;
type UseState<T = any> = [T, (value: T | undefined | UpdateCallback) => void, crypto.UUID];

const state: Record<string, any> = {};
const setState = <T = any>(
  entries: { [key: string]: T },
): void => {
  Object.entries(entries).forEach(([key, value]) => state[key] = value);
}
const updateState = <T = any>(
  key: string,
  value: T | UpdateCallback,
): void => {
  value = typeof value === 'function'
    ? (value as Function)(state[key])
    : value;
  state[key] = value as T;
}

export const useState = <T = any>(value?: T): UseState => {
  const key = crypto.randomUUID();
  setState<T>({ [key]: value as T });
  const update = (value: T | UpdateCallback) => updateState<T>(key, value);
  return [value, update, key];
};
