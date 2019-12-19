import Map from "../Map";
import { rect } from "../matrix";
import Point from "../Point";
import { insideCircle } from "../circle";
import assert from "power-assert";

test("円の範囲内のPointを求める", () => {
  const outsides = [
    new Point(0, 0),
    new Point(1, 0),
    new Point(5, 0),
    new Point(6, 0),
    new Point(0, 1),
    new Point(6, 1),
    new Point(0, 5),
    new Point(6, 5),
    new Point(0, 6),
    new Point(1, 6),
    new Point(5, 6),
    new Point(6, 6)
  ];
  const box = new Map<number>(7, 7);
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
