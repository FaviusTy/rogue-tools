import DataGrid from "../DataGrid";
import { rect } from "../matrix";
import Point, { point } from "../Point";
import { insideCircle, beautifyRadius } from "../circle";
import assert from "power-assert";

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
