import PrivateFields from "./utils/PrivateFields";
import lerp from "./utils/lerp";
const { abs, round, sqrt, pow, floor } = Math;
const instanceCaches = new Map<string, Point>();
const privates = new PrivateFields<Point, Privates>();

type Privates = {
  x: number;
  y: number;
  key: string;
};

function key(x: number, y: number) {
  return `${x},${y}`;
}

export function point(x: number = 0, y: number = 0) {
  return new Point(x, y);
}

export default class Point {
  constructor(x: number = 0, y: number = 0) {
    const cache = instanceCaches.get(key(x, y));
    if (cache) {
      return cache;
    }
    privates.set(this, { x: x, y: y, key: key(x, y) });
    instanceCaches.set(key(x, y), this);
  }

  toString() {
    return `Point{${this.key}}`;
  }

  static sort(a: Point, b: Point) {
    const diff = a.sub(b);
    if (diff.x === 0 && diff.y === 0) return 0;
    if (diff.x !== 0) return diff.x;
    return diff.y;
  }

  static lerp(start: Point, end: Point, t: number) {
    return new Point(lerp(start.x, end.x, t), lerp(start.y, end.y, t));
  }

  get x(): number {
    return privates.get(this).x;
  }

  get y(): number {
    return privates.get(this).y;
  }

  get key(): string {
    return privates.get(this).key;
  }

  get abs() {
    return new Point(abs(this.x), abs(this.y));
  }

  get round() {
    return new Point(round(this.x), round(this.y));
  }

  get floor() {
    return new Point(floor(this.x), floor(this.y));
  }

  distanse(point: Point) {
    return sqrt(pow(this.x - point.x, 2) + pow(this.y - point.y, 2));
  }

  add(point: Point): Point {
    return new Point(this.x + point.x, this.y + point.y);
  }

  sub(point: Point): Point {
    return new Point(this.x - point.x, this.y - point.y);
  }

  mul(point: Point): Point {
    return new Point(this.x * point.x, this.y * point.y);
  }

  div(point: Point): Point {
    return new Point(this.x / point.x, this.y / point.y);
  }
}
