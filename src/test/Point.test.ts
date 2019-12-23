import assert from "power-assert";
import Point from "../Point";

test("Point は引数 x, y の値を持つ", () => {
  const point = new Point(1, 2);
  assert(point.x === 1);
  assert(point.y === 2);
});

test("Point.key でシリアライズされた文字列を受け取れる", () => {
  const point = new Point(10, 15);
  assert("10,15" === point.key);
});

test("同じx,yによって生成されたPointは常に同じインスタンスとなる", () => {
  const a = new Point(1, 1);
  const b = new Point(1, 1);
  const c = new Point(1, 2);
  assert(a === b);
  assert(c !== a && c !== b);
});

test("Point.toStringで適切な文字列が出力される", () => {
  const point = new Point(12, 1);
  assert(`${point}` === "Point{12,1}");
});

test("Point.distanse で二点間の距離を求める", () => {
  const base = new Point(0, 0);
  assert(base.distanse(new Point(0, 5)) === 5);
  assert(base.distanse(new Point(5, 0)) === 5);
  assert(base.distanse(new Point(4, 3)) === 5);
  assert(base.distanse(new Point(-4, -3)) === 5);
  assert(base.distanse(new Point(0, 0)) === 0);
  assert(Math.floor(base.distanse(new Point(5, 5))) === 7);
});

test("Point.add", () => {
  const pointA = new Point(10, 8);
  const pointB = new Point(1, 5);
  assert("11,13" === pointA.add(pointB).key);
});

test("Point.sub", () => {
  const pointA = new Point(4, 6);
  const pointB = new Point(3, 8);
  assert("1,-2" === pointA.sub(pointB).key);
});

test("Point.mul", () => {
  const pointA = new Point(23, 8);
  const pointB = new Point(4, 89);
  assert("92,712" === pointA.mul(pointB).key);
});

test("Point.div", () => {
  const pointA = new Point(12, 45);
  const pointB = new Point(3, 7);
  assert("4,6.428571428571429" === pointA.div(pointB).key);
});

test("Point.sort", () => {
  const points = [
    new Point(19, 2),
    new Point(19, 0),
    new Point(19, 2),
    new Point(1, 20),
    new Point(0, 0)
  ];
  const result = points.sort(Point.sort);
  assert(result[0] === new Point(0, 0));
  assert(result[1] === new Point(1, 20));
  assert(result[2] === new Point(19, 0));
  assert(result[3] === new Point(19, 2));
  assert(result[4] === new Point(19, 2));
});
