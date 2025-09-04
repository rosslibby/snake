type UpdateCallback<T = any> = (value?: T) => T;
type StateRecord<T = any> = {
  index: number;
  value: T;
  update: (value: T | UpdateCallback) => void;
};
type UseState<T = any> = [T, (value: T | UpdateCallback) => void];

class State {
  private recordIterator: number = 0;
  private refresh = this._refresh.bind(this);
  private update = this._update.bind(this);
  private render = this._render.bind(this);

  public records: Record<number, StateRecord> = {};
  public useState = this._useState.bind(this);

  private addRecord<T = any>(
    value: T,
  ): UseState<T> {
    const key = Object.keys(this.records).length;
    const update = (value: T | UpdateCallback) => this.update<T>(key, value);

    this.records[key] = { index: key, value, update };

    return [value, update];
  }

  private _init<T = any>(
    value: T,
  ): UseState<T> {
    const record = this.records[this.recordIterator];
    this.recordIterator++;

    if (record) {
      return [record.value, record.update];
    } else {
      return this.addRecord(value);
    }
  }

  private _update<T = any>(
    key: number,
    value: T | UpdateCallback,
  ): void {
    const record = this.records[key];
    const result = this._result(key, value);
    this.records[record.index].value = result;
    this.refresh();
  }

  private _callback<T = any>(
    key: number,
    cb: UpdateCallback,
  ): T {
    const record = this.records[key];
    const current = record.value;
    return cb(current);
  }

  private _result<T = any>(
    key: number,
    value: T | UpdateCallback,
  ): T {
    return typeof value === 'function'
      ? this._callback(key, value as UpdateCallback)
      : value;
  }

  private _useState<T = any>(value: T): UseState<T> {
    return this._init<T>(value);
  }

  private _refresh() {
    this.recordIterator = 0;
    this.render();
  }

  public _render() {
    const useState = this._useState.bind(this);

    const [alpha, setAlpha] = useState<boolean>(false);
    const [bravo, setBravo] = useState<number>(0);
    console.log(`[alpha::${alpha}]\n`);
    console.log(`Bravo:`, bravo.toString().padStart(2, '0'));
    const increment = () => setBravo((bravo) => bravo + 1);

    if (alpha && bravo < 10) {
      setTimeout(increment, 750);
    }

    if (!alpha) {
      console.log(`[initiating timeout]`)
      setTimeout(() => {
        setAlpha((prev: boolean) => !prev);
      }, 750);
    }
  }
}

(new State())._render();
