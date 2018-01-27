import Point from './Point'

const privates = new WeakMap()
export default class Neighbors {
  constructor(edges = 4) {
    privates.set(this, { edges: edges })
  }

  get edges() {
    return privates.get(this).edges
  }

  up(point) {
    return new Point(point.x, point.y - 1)
  }

  down(point) {
    return new Point(point.x, point.y + 1)
  }

  left(point) {
    return new Point(point.x - 1, point.y)
  }

  right(point) {
    return new Point(point.x + 1, point.y)
  }

  upperLeft(point) {
    if (this.edges === 4) return undefined
    if (this.edges === 8) return this.left(this.up(point))
  }

  upperRight(point) {
    if (this.edges === 4) return undefined
    if (this.edges === 8) return this.right(this.up(point))
  }

  bottomLeft(point) {
    if (this.edges === 4) return undefined
    if (this.edges === 8) return this.left(this.down(point))
  }

  bottomRight(point) {
    if (this.edges === 4) return undefined
    if (this.edges === 8) return this.right(this.down(point))
  }

  arounds(point) {
    return [
      this.up(point),
      this.upperRight(point),
      this.right(point),
      this.bottomRight(point),
      this.down(point),
      this.bottomLeft(point),
      this.left(point),
      this.upperLeft(point),
    ].filter(point => point)
  }
}
