import exsits from "./utils/exsits";
import Point from "./Point";
import PriveteFields from "./utils/PrivateFields";

type Edges = 4 | 8;

const privates = new PriveteFields<Neighbors, Edges>();

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
    if (this.edges === 4) return undefined;
    if (this.edges === 8) return this.left(this.up(point));
  }

  upperRight(point: Point) {
    if (this.edges === 4) return undefined;
    if (this.edges === 8) return this.right(this.up(point));
  }

  bottomLeft(point: Point) {
    if (this.edges === 4) return undefined;
    if (this.edges === 8) return this.left(this.down(point));
  }

  bottomRight(point: Point) {
    if (this.edges === 4) return undefined;
    if (this.edges === 8) return this.right(this.down(point));
  }

  arounds(point: Point): Array<Point> {
    return [
      this.up(point),
      this.upperRight(point),
      this.right(point),
      this.bottomRight(point),
      this.down(point),
      this.bottomLeft(point),
      this.left(point),
      this.upperLeft(point)
    ].filter(exsits);
  }
}