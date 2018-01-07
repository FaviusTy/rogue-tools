import range from './utils/range'
import Point from './Point'

export function row(point, length = 1) {
  return range(length).map(x => new Point(point.x + x, point.y))
}

export function column(point, length = 1) {
  return range(length).map(y => new Point(point.x, point.y + y))
}

export function rect(point, width = 1, height = 1) {
  return range(height, point.y).reduce((res, y) => res.concat(...range(width, point.x).map(x => new Point(x, y))), [])
}
