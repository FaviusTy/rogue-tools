import either from './utils/either'
import Point from './Point'

function isPositive(number) {
  return number >= 0
}

function convertRawIndex({ x, y }, { width }) {
  return either(y, isPositive)(0) * width + either(x, isPositive)(0)
}

const privates = new WeakMap()

export default class Map {
  constructor(width = 0, height = 0) {
    privates.set(this, {
      width: width,
      height: height,
      raw: new Array(width * height),
    })
  }

  get width() {
    return privates.get(this).width
  }

  get height() {
    return privates.get(this).height
  }

  get raw() {
    return [...privates.get(this).raw]
  }

  isOverRange(point) {
    const { x, y } = point
    if (x < 0 || y < 0) return false
    return x >= this.width || y >= this.height
  }

  fill(element) {
    privates.get(this).raw.fill(element)
  }

  put(point, value) {
    if (this.isOverRange(point)) return new Error(`"${point.key}" is over range!`)
    privates.get(this).raw[convertRawIndex(point, this)] = value
    console.log(privates.get(this).raw)
  }

  pick(point) {
    if (this.isOverRange(point)) return
    return privates.get(this).raw[convertRawIndex(point, this)]
  }
}
