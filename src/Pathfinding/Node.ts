import Point from "../Point";

export const NONE = 0 as const;
export const OPEN = 1 as const;
export const CLOSE = 2 as const;

export type NodeState = typeof NONE | typeof OPEN | typeof CLOSE;

export default class Node {
  point: Point;
  g_cost: number;
  h_cost: number;
  state: NodeState;
  parent?: Node;

  constructor(point: Point) {
    this.point = point;
    this.g_cost = 0;
    this.h_cost = 0;
    this.state = NONE;
  }

  get x() {
    return this.point.x;
  }

  get y() {
    return this.point.y;
  }

  get cost() {
    return this.g_cost + this.h_cost;
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

  backtrack(list: Point[] = []): Point[] {
    if (this.parent) {
      return this.parent.backtrack([...list, this.point]);
    }

    return [...list, this.point].reverse();
  }
}
