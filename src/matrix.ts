import range from "./utils/range";
import Point from "./Point";

export function row(point: Point, length: number = 1) {
  return range(length).map(x => new Point(point.x + x, point.y));
}

export function column(point: Point, length: number = 1) {
  return range(length).map(y => new Point(point.x, point.y + y));
}

export function rect(point: Point, width: number = 1, height: number = 1) {
  return range(height, point.y).reduce(
    (res, y) => res.concat(...range(width, point.x).map(x => new Point(x, y))),
    [] as Point[]
  );
}

export function line(start: Point, end: Point) {
  const { x, y } = start.sub(end).abs;
  const diagonal_distance = x > y ? x : y;
  return range(diagonal_distance + 1)
    .map((_, index) =>
      diagonal_distance === 0 ? 0 : index / diagonal_distance
    )
    .map(t => {
      return Point.lerp(start, end, t).round;
    });
}

export function isMatrix(target: Point[]) {
  if (!Array.isArray(target)) return false;
  if (target.length === 0) return true;
  if (target.filter(point => !(point instanceof Point)).length !== 0)
    return false;
  return true;
}
