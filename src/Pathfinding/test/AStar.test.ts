import assert from "power-assert";
import AStar from "../AStar";
import Map from "../../Map";
import Point from "../../Point";

test("Astar", () => {
  const target = new AStar({});
  assert(target.findPath);
});

test("flat routing", () => {
  const map = new Map<{ cost: number }>(5, 7);
  map.fill({ cost: 0 });
  const aster = new AStar({});
  const result = aster.findPath(new Point(0, 0), new Point(5, 7), map);
  console.log(result);
});
