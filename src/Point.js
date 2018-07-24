// @flow
import PrivateFields from './utils/PrivateFields'
const privates = new PrivateFields()

export default class Point {
  constructor(x: number = 0, y: number = 0) {
    privates.set(this, { x: x, y: y, key: `${x},${y}` })
  }

  get x(): number {
    return privates.get(this).x
  }

  get y(): number {
    return privates.get(this).y
  }

  get key(): string {
    return privates.get(this).key
  }
}
