// @flow
import PrivateFields from './utils/PrivateFields'
import lerp from './utils/lerp'
const { abs, round } = Math
const privates = new PrivateFields()

export default class Point {
  constructor(x: number = 0, y: number = 0) {
    privates.set(this, { x: x, y: y, key: `${x},${y}` })
  }

  static lerp(start: Point, end: Point, t: number) {
    return new Point(lerp(start.x, end.x, t), lerp(start.y, end.y, t))
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

  get abs() {
    return new Point(abs(this.x), abs(this.y))
  }

  get round() {
    return new Point(round(this.x), round(this.y))
  }

  add(point: Point): Point {
    return new Point(this.x + point.x, this.y + point.y)
  }

  sub(point: Point): Point {
    return new Point(this.x - point.x, this.y - point.y)
  }

  mul(point: Point): Point {
    return new Point(this.x * point.x, this.y * point.y)
  }

  div(point: Point): Point {
    return new Point(this.x / point.x, this.y / point.y)
  }
}
