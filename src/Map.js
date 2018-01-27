import either from './utils/either'
import range from './utils/range'
import { rect } from './matrix'
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
    if (x < 0 || y < 0) return true
    return x >= this.width || y >= this.height
  }

  fill(element) {
    privates.get(this).raw.fill(element)
  }

  put(point, element) {
    if (this.isOverRange(point)) return new Error(`"${point.key}" is over range!`)
    privates.get(this).raw[convertRawIndex(point, this)] = element
  }

  pick(point) {
    if (this.isOverRange(point)) return
    return privates.get(this).raw[convertRawIndex(point, this)]
  }

  pickOut(point) {
    if (this.isOverRange(point)) return
    const result = this.pick(point)
    this.put(point, undefined)
    return result
  }

  paste(point, map) {
    const pasteRect = rect(point, map.width, map.height)
    map.raw.forEach((element, index) => {
      const point = pasteRect[index]
      if (this.isOverRange(point)) return
      this.put(point, element)
    })
  }

  clip(point, size) {
    if (this.isOverRange(point)) return
    const result = new Map(size.width, size.height)
    const clipRect = rect(point, size.width, size.height)
    rect(new Point(0, 0), size.width, size.height).forEach((point, index) => {
      result.put(point, this.pick(clipRect[index]))
    })
    return result
  }
}
