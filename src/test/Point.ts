import assert from "power-assert";
import Point from "../Point";

test("Point は引数 x, y の値を持つ", () => {
  const point = new Point(1, 2);
  assert(point.x === 1);
  assert(point.y === 2);
});

test("Point.key() でシリアライズされた文字列を受け取れる", () => {
  const point = new Point(10, 15);
  assert("10,15" === point.key);
});

test("同じx,yによって生成されたPointは常に同じインスタンスとなる", () => {
  const a = new Point(1, 1);
  const b = new Point(1, 1);
  assert(a === b);
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
