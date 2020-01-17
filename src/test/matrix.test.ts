import assert from "power-assert";
import { stripIndents } from "common-tags";
import range from "@favi_ty/range";
import Point, { point } from "../Point";
import DataGrid from "../DataGrid";
import {
  isMatrix,
  row,
  column,
  rect,
  circle,
  line,
  beautifyRadius,
  insideCircle
} from "../matrix";

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

test("circle", () => {
  const data = new DataGrid(9, 9);
  const matcher = stripIndents`
  0 0 1 1 1 1 1 0 0
  0 1 1 1 1 1 1 1 0
  1 1 1 1 1 1 1 1 1
  1 1 1 1 1 1 1 1 1
  1 1 1 1 1 1 1 1 1
  1 1 1 1 1 1 1 1 1
  1 1 1 1 1 1 1 1 1
  0 1 1 1 1 1 1 1 0
  0 0 1 1 1 1 1 0 0
  `;
  data.fill(0);
  circle(point(4, 4), 4.5).forEach(point => data.put(point, 1));
  assert(`${data}` === matcher);
});

test("円の範囲内のPointを求める", () => {
  const outsides = [
    point(0, 0),
    point(1, 0),
    point(5, 0),
    point(6, 0),
    point(0, 1),
    point(6, 1),
    point(0, 5),
    point(6, 5),
    point(0, 6),
    point(1, 6),
    point(5, 6),
    point(6, 6)
  ];
  const box = new DataGrid<number>(7, 7);
  const center = new Point(3, 3);
  box.fill(0);
  const boxPoints = rect(new Point(0, 0), 7, 7);
  boxPoints.map(point => {
    if (insideCircle(center, point, 3.5)) {
      return box.put(point, 1);
    }
  });
  boxPoints.forEach(point => {
    if (outsides.find(outside => point === outside)) {
      return assert(box.pick(point) === 0);
    }
    assert(box.pick(point) === 1);
  });
});

test("半径の値をN.5に丸める", () => {
  assert(beautifyRadius(1) === 1.5);
  assert(beautifyRadius(5.1) === 5.5);
  assert(beautifyRadius(14.9) === 14.5);
});
