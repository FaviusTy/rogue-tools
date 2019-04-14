export default class PrivateFields<K extends object, V> {
  map: WeakMap<K, V>;

  constructor() {
    this.map = new WeakMap();
  }

  set(instanse: K, value: V) {
    this.map.set(instanse, value);
  }

  get(instanse: K): V {
    const value = this.map.get(instanse);
    if (!value) {
      throw new Error("undefined private value!");
    }
    return value;
  }
}
