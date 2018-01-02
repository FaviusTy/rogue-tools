import either from './utils/either'
import Point from './Point'

function convert1DPoint(pointer, map) {
  return either(pointer.y, y => y >= 0)(0) * map.width + pointer.x
}

function isOverRange(point, map) {
  return point.x > map.width || point.y > map.height
}

export default class Map {
  constructor(width = 0, height = 0) {
    this.width = width
    this.height = height
    this._row = new Array(this.width * this.height)
  }

  get row() {
    return [...this._row]
  }

  put(point, value) {
    if (isOverRange(point, this)) return new Error(`"${point.key}" is over range!`)
    this._row[convert1DPoint(point, this)] = value
  }

  pick(point) {
    if (isOverRange(point, this)) return
    return this._row[convert1DPoint(point, this)]
  }
}
