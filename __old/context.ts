import crypto from 'crypto';
import { useState } from './stateful';

type SingleContext = Record<string, crypto.UUID>;
type Contexts = Record<crypto.UUID, SingleContext>;

class Context {
  public static contexts: Contexts = {};

  public create(initial: SingleContext): crypto.UUID {
    const id = crypto.randomUUID();
    Context.contexts[id] = initial;
    return id;
  }

  public getContext(key: string): Record<string, any> {
    return Context.contexts[key as crypto.UUID];
  }
}

const contextApi = new Context();

const context: Record<string, string> = {};
const addContext = (key: string, id: string): void => {
  context[key] = id;
};

const createContext = (initial: SingleContext) => contextApi.create(initial);

const utils = {
  add: addContext,
  list: Context.contexts,
  create: createContext,
};

export { utils as context };

// settings ctx
const [speed, setSpeed, speedKey] = useState(125);
const [columns, setColumns, columnsKey] = useState(25);
const [rows, setRows, rowsKey] = useState(25);
const [cells, setCells, cellsKey] = useState(columns * rows);

export const settingsCtx = createContext({
  speed: speedKey,
  columns: columnsKey,
  rows: rowsKey,
  cells: cellsKey,
});
