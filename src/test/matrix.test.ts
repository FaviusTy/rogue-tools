import assert from "power-assert";
import range from "../utils/range";
import Point, { point } from "../Point";
import { isMatrix, row, column, rect, line } from "../matrix";

test("matrix とは各要素がPointだけで構成された配列である", () => {
  assert(!isMatrix("notMatrix"));
  assert(!isMatrix(["notMatrix"]));
  assert(!isMatrix(new Point(0, 0)));
  assert(!isMatrix([new Point(0, 0), "notMatrix", new Point(0, 2)]));
  assert(isMatrix([]));
  assert(isMatrix([new Point(0, 0)]));
});

test("それは row によって引数で指定した Point を基点として length 分だけの Array<Point> を返す", () => {
  const point = new Point(1, 2);
  const results = row(point, 5);
  assert(results.length === 5);
  range(5).forEach(x => {
    const res = results[x];
    assert(res.x === point.x + x);
    assert(res.y === 2);
  });
});

test("それは column によって引数で指定した Point を基点として length 分だけの Array<Point> を返す", () => {
  const point = new Point(0, 1);
  const results = column(point, 4);
  assert(results.length === 4);
  range(4).forEach(y => {
    const res = results[y];
    assert(res.x === 0);
    assert(res.y === point.y + y);
  });
});

test("それは rect によって引数で指定した Point を基点として width, height の範囲分の Array<Point> を返す", () => {
  const point = new Point(2, 5);
  const results = rect(point, 5, 5);
  range(5).forEach(y => {
    range(5).forEach(x => {
      assert(
        results.findIndex(
          result => result.x === point.x + x && result.y === point.y + y
        ) >= 0
      );
    });
  });
});

test("それは line によって引数でした2点間の Point を結ぶ直線上に位置する全ての Point を含む Array<Point> を返す", () => {
  const result = line(point(1, 1), point(8, 7));
  const answer = [
    point(1, 1),
    point(2, 2),
    point(3, 3),
    point(4, 4),
    point(5, 4),
    point(6, 5),
    point(7, 6),
    point(8, 7)
  ];
  result.forEach((point, index) => {
    assert(point.key === answer[index].key);
  });
});
