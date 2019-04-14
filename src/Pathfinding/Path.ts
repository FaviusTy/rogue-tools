import Point from "../Point";

export const NONE = 0 as const;
export const OPEN = 1 as const;
export const CLOSE = 2 as const;

export type NodeState = typeof NONE | typeof OPEN | typeof CLOSE;

export default class Path {
  point: Point;
  f_cost: number;
  g_cost: number;
  h_cost: number;
  state: NodeState;

  constructor(point: Point) {
    this.point = point;
    this.f_cost = 0; // TODO: 整理する
    this.g_cost = 0;
    this.h_cost = 0;
    this.state = OPEN;
  }

  get x() {
    return this.point.x;
  }

  get y() {
    return this.point.y;
  }

  open() {
    this.state = OPEN;
  }

  get opened() {
    return this.state === OPEN;
  }

  close() {
    this.state = CLOSE;
  }

  get closed() {
    return this.state === CLOSE;
  }
}
