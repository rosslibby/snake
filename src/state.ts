import crypto from 'crypto';

type UpdateCallback<T = any> = (value?: T) => T;
type StateRecord<T = any> = {
  index: number;
  id: string;
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
  public state: Record<string, any> = {};
  public useState = this._useState.bind(this);

  private addRecord<T = any>(
    value: T,
  ): UseState<T> {
    const key = Object.keys(this.records).length;
    const id = crypto.randomUUID();
    const update = (value: T | UpdateCallback) => this.update<T>(id, value);

    this.records[key] = { index: key, id, value, update };
    this.state[id] = value;

    return [value, update];
  }

  private updateRecord<T = any>(
    index: number,
    value: T,
  ): void {
    this.records[index].value = value;
  }

  private getRecordById(id: string): StateRecord {
    const [, record] = Object.entries(this.records).find(
      ([, { id: recordId }]) => id === recordId
    ) as [string, StateRecord];
    return record;
  }

  private getRecord(index: number): StateRecord {
    return this.records[index];
  }

  private _init<T = any>(
    value: T,
  ): UseState<T> {
    const record = this.getRecord(this.recordIterator);
    this.recordIterator++;

    if (record) {
      return [record.value, record.update];
    } else {
      return this.addRecord(value);
    }
  }

  public init<T = any>(
    value: T,
  ): UseState<T> {
    const id = crypto.randomUUID();
    this.state[id] = value;
    this.addRecord<T>(value);
    const update = (value: T | UpdateCallback) => this.update<T>(id, value);
    return [value, update];
  }

  private _update<T = any>(
    key: string,
    value: T | UpdateCallback,
  ): void {
    const record = this.getRecordById(key);
    const result = this._result(key, value);
    this.records[record.index].value = result;
    this.state[key] = result;
    this.refresh();
  }

  private _callback<T = any>(
    key: string,
    cb: UpdateCallback,
  ): T {
    const record = this.getRecordById(key);
    const current = record.value;
    // const current = this.state[key];
    return cb(current);
  }

  private _result<T = any>(
    key: string,
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
    const useState = <T = any>(value: T) => this._init(value);

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
