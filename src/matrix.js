// @flow

import range from './utils/range'
import Point from './Point'

export function row(point: Point, length: number = 1) {
  return range(length).map(x => new Point(point.x + x, point.y))
}

export function column(point: Point, length: number = 1) {
  return range(length).map(y => new Point(point.x, point.y + y))
}

export function rect(point: Point, width: number = 1, height: number = 1) {
  return range(height, point.y).reduce((res, y) => res.concat(...range(width, point.x).map(x => new Point(x, y))), [])
}

export function isMatrix(target: any) {
  if (!Array.isArray(target)) return false
  if (target.length === 0) return true
  if (target.filter(point => !(point instanceof Point)).length !== 0) return false
  return true
}
