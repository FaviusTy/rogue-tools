import assert from "power-assert";
import AStar from "../AStar";
import Map from "../../Map";
import Point from "../../Point";
import {
  DiagonalMovement,
  Never,
  OnlyWhenNoObstacles,
  IfAtMostOneObstacle,
  diagonalWalkable,
  Always
} from "../DiagonalMovement";

test("Astar", () => {
  const target = new AStar({});
  assert(target.findPath);
});

test.skip("flat routing", () => {
  const map = new Map<{ cost: number }>(5, 7);
  map.fill({ cost: 0 });
  const aster = new AStar({});
  const result = aster.findPath(new Point(0, 0), new Point(4, 6), map);
  // console.log(result.map(point => point.key));
});

test("diagonal move: Always", () => {
  const map = new Map<{ cost: number }>(2, 2);
  map.fill({ cost: 0 });
  console.log(map.pick(new Point(1, 1)));
  const aster = new AStar({ diagonalMovement: Always });
  const result = aster.findPath(new Point(0, 0), new Point(1, 1), map);
  console.log(result.map(point => point.key));
});
