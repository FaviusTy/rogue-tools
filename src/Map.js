import either from './utils/either'
import Point from './Point'

function convert1DPoint({ x, y, key }, { width }) {
  return either(y, y => y >= 0)(0) * width + x
}

function isOverRange({ x, y }, { width, height }) {
  return x >= width || y >= height
}

const privates = new WeakMap()

export default class Map {
  constructor(width = 0, height = 0) {
    privates.set(this, {
      width: width,
      height: height,
      row: new Array(width * height),
    })
  }

  get width() {
    return privates.get(this).width
  }

  get height() {
    return privates.get(this).height
  }

  get row() {
    return [...privates.get(this).row]
  }

  put(point, value) {
    if (isOverRange(point, this)) return new Error(`"${point.key}" is over range!`)
    console.log('put')
    privates.get(this).row[convert1DPoint(point, this)] = value
    console.log(privates.get(this).row)
  }

  pick(point) {
    if (isOverRange(point, this)) return
    return privates.get(this).row[convert1DPoint(point, this)]
  }
}
