import assert from "power-assert";
import Point from "../Point";
import Neighbors from "../Neighbors";

const neighbors4 = new Neighbors(4);
const neighbors8 = new Neighbors(8);

test("それは edges を与えて生成される", () => {
  assert(neighbors4 instanceof Neighbors);
});

test("それはメソッドに point を与えることで隣接している Point を生成する", () => {
  const point = new Point(1, 1);
  assert(neighbors4.up(point).y === 0);
  assert(neighbors4.down(point).y === 2);
  assert(neighbors4.left(point).x === 0);
  assert(neighbors4.right(point).x === 2);
});

test("それは edges に対応していないメソッドを使うと null を返す", () => {
  const point = new Point(1, 1);
  assert(neighbors4.upperLeft(point) === null);
  assert(neighbors4.upperRight(point) === null);
  assert(neighbors4.bottomLeft(point) === null);
  assert(neighbors4.bottomRight(point) === null);
});

test("それは arounds に point を与えることで edges によって隣接されている方向の Point を配列にして返す", () => {
  const point = new Point(1, 1);
  const arounds = neighbors4.arounds(point);
  assert(arounds.length === 4);
  assert(neighbors8.arounds(point).length === 8);
});
