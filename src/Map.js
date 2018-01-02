import either from './utils/either'
import Point from './Point'

function convert1DPoint(pointer, map) {
  return either(pointer.y - 1, y => y >= 0)(0) * map.width + pointer.x
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
    this._row[convert1DPoint(point, this)] = value
  }

  pick(point) {
    return this._row[convert1DPoint(point, this)]
  }
}
