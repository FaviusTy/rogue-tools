const privates = new WeakMap()

export default class Point {
  constructor(x = 0, y = 0) {
    privates.set(this, { x: x, y: y, key: `${x},${y}` })
  }

  get x() {
    return privates.get(this).x
  }

  get y() {
    return privates.get(this).y
  }

  get key() {
    return privates.get(this).key
  }
}
