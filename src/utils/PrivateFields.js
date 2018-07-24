// @flow

export default class PrivateFields {
  map: WeakMap<Object, Object>

  constructor() {
    this.map = new WeakMap()
  }

  set(instanse: Object, value: Object) {
    this.map.set(instanse, value)
  }

  get(instanse: Object): Object {
    const value = this.map.get(instanse)
    return value ? value : {}
  }
}
