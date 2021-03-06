import Point from "./Point";
import PriveteFields from "@favi_ty/private-fields";
import exists from "./utils/exsits";

type Edges = 4 | 8;

const privates = new PriveteFields<Neighbors, Edges>();

export const NeighborIndexes = Object.freeze({
  UP: 0 as const,
  UP_RIGHT: 1 as const,
  RIGHT: 2 as const,
  BOTTOM_RIGHT: 3 as const,
  BOTTOM: 4 as const,
  BOTTOM_LEFT: 5 as const,
  LEFT: 6 as const,
  UP_LEFT: 7 as const
});

export default class Neighbors {
  constructor(edges: Edges = 4) {
    privates.set(this, edges);
  }

  get edges(): Edges {
    return privates.get(this);
  }

  up(point: Point) {
    return new Point(point.x, point.y - 1);
  }

  down(point: Point) {
    return new Point(point.x, point.y + 1);
  }

  left(point: Point) {
    return new Point(point.x - 1, point.y);
  }

  right(point: Point) {
    return new Point(point.x + 1, point.y);
  }

  upperLeft(point: Point) {
    if (this.edges === 4) return null;
    return this.left(this.up(point));
  }

  upperRight(point: Point) {
    if (this.edges === 4) return null;
    return this.right(this.up(point));
  }

  bottomLeft(point: Point) {
    if (this.edges === 4) return null;
    return this.left(this.down(point));
  }

  bottomRight(point: Point) {
    if (this.edges === 4) return null;
    return this.right(this.down(point));
  }

  /*
   *  +---+---+---+
   *  | 7 | 0 | 1 |
   *  +---+---+---+
   *  | 6 |   | 2 |
   *  +---+---+---+
   *  | 5 | 4 | 3 |
   *  +---+---+---+
   */
  arounds(point: Point): Array<Point | null> {
    const result = [
      this.up(point),
      this.upperRight(point),
      this.right(point),
      this.bottomRight(point),
      this.down(point),
      this.bottomLeft(point),
      this.left(point),
      this.upperLeft(point)
    ];

    return this.edges === 4 ? result.filter(exists) : result;
  }
}
