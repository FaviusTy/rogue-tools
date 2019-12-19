import assert from "power-assert";
import { stripIndents } from "common-tags";
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

test("flat routing: Never", () => {
  const map = new Map<number>(5, 7);
  const matcher = stripIndents`
  1 1 1 1 1
  0 0 0 0 1
  0 0 0 0 1
  0 0 0 0 1
  0 0 0 0 1
  0 0 0 0 1
  0 0 0 0 1
  `;
  map.fill(0);
  const aster = new AStar({});
  const result = aster.findPath(new Point(0, 0), new Point(4, 6), map);
  result.forEach(point => map.put(point, 1));
  assert(`${map}` === matcher);
});

test("flat routing: Always", () => {
  const map = new Map<number>(5, 7);
  const matcher = stripIndents`
  1 0 0 0 0
  0 1 0 0 0
  0 0 1 0 0
  0 0 0 1 0
  0 0 0 0 1
  0 0 0 0 1
  0 0 0 0 1
  `;
  map.fill(0);
  const aster = new AStar({ diagonalMovement: Always });
  const result = aster.findPath(new Point(0, 0), new Point(4, 6), map);
  result.forEach(point => map.put(point, 1));
  assert(`${map}` === matcher);
});

test("diagonal move: Never", () => {
  const map = new Map<number>(2, 2);
  const matcher = stripIndents`
  1 1
  0 1
  `;
  map.fill(0);
  const aster = new AStar({});
  const result = aster.findPath(new Point(0, 0), new Point(1, 1), map);
  result.forEach(point => map.put(point, 1));
  assert(`${map}` === matcher);
});

test("diagonal move: Always", () => {
  const map = new Map<number>(2, 2);
  const matcher = stripIndents`
  1 0
  0 1
  `;
  map.fill(0);
  const aster = new AStar({ diagonalMovement: Always });
  const result = aster.findPath(new Point(0, 0), new Point(1, 1), map);
  result.forEach(point => map.put(point, 1));
  assert(`${map}` === matcher);
});
