import either from "@favi_ty/either";
import PrivateFields from "@favi_ty/private-fields";
import { rect } from "./matrix";
import Point from "./Point";
import range from "@favi_ty/range";

type Privates = {
  width: number;
  height: number;
  raw: any[];
};

type Size = {
  width: number;
  height: number;
};

function isPositive(value: number): value is number {
  return value >= 0;
}

function convertRawIndex<E>({ x, y }: Point, { width }: Map<E>): number {
  return either(y, isPositive)(0) * width + either(x, isPositive)(0);
}

const privates = new PrivateFields<Map<any>, Privates>();

export default class Map<E> {
  constructor(width: number = 0, height: number = 0) {
    privates.set(this, {
      width: width,
      height: height,
      raw: new Array<E | undefined>(width * height)
    });
  }

  toString() {
    const raw = this.raw;
    return range(this.height, 1)
      .map(y => this.width * y)
      .map(endX => {
        return raw
          .slice(endX - this.width, endX)
          .map(item => `${item}`)
          .join(" ");
      })
      .join("\n");
  }

  get width(): number {
    return privates.get(this).width;
  }

  get height(): number {
    return privates.get(this).height;
  }

  get raw(): Array<E | undefined> {
    return [...either(privates.get(this).raw)([])];
  }

  isOverRange(point: Point) {
    const { x, y } = point;
    if (x < 0 || y < 0) return true;
    return x >= this.width || y >= this.height;
  }

  fill(element: E) {
    privates.get(this).raw.fill(element);
  }

  put(point: Point, element?: E) {
    if (this.isOverRange(point)) return;
    privates.get(this).raw[convertRawIndex(point, this)] = element;
  }

  pick(point: Point): E | undefined {
    if (this.isOverRange(point)) return;
    return privates.get(this).raw[convertRawIndex(point, this)];
  }

  pickOut(point: Point) {
    if (this.isOverRange(point)) return;
    const result = this.pick(point);
    this.put(point);
    return result;
  }

  paste(point: Point, map: Map<E>) {
    const pasteRect = rect(point, map.width, map.height);
    map.raw.forEach((element, index) => {
      const point = pasteRect[index];
      if (this.isOverRange(point)) return;
      this.put(point, element);
    });
  }

  clip(point: Point, { width, height }: Size) {
    if (this.isOverRange(point)) return;
    const result = new Map<E>(width, height);
    const clipRect = rect(point, width, height);
    rect(new Point(0, 0), width, height).forEach((point, index) => {
      result.put(point, this.pick(clipRect[index]));
    });
    return result;
  }
}
