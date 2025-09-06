import { StateEntry, UpdateCallback, UseState } from '@/types';

export class State {
  private recordIterator: number = 0;
  private refresh = this._refresh.bind(this);
  private update = this._update.bind(this);
  private _onRefresh: () => void = this.onRefresh.bind(this);

  public records: Record<number, StateEntry> = {};
  public utils = {
    useState: this._useState.bind(this),
  };

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

  public onRefresh(): void {}

  private _refresh() {
    this.recordIterator = 0;
    this._onRefresh();
  }
}
