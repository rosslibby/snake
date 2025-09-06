import { context } from './context';
import { useState } from './stateful';

// settings ctx
const [speed, setSpeed, speedKey] = useState(125);
const [columns, setColumns, columnsKey] = useState(25);
const [rows, setRows, rowsKey] = useState(25);
const [cells, setCells, cellsKey] = useState(columns * rows);

export const settingsCtx = context.create({
  speed: speedKey,
  columns: columnsKey,
  rows: rowsKey,
  cells: cellsKey,
});
