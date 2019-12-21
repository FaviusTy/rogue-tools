import assert from "power-assert";
import { stripIndents } from "common-tags";
import AStar from "../AStar";
import DataGrid from "../../DataGrid";
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
  const map = new DataGrid<number>(5, 7);
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
  const map = new DataGrid<number>(5, 7);
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
  const map = new DataGrid<number | "*">(2, 2);
  map.fill(0);
  const aster = new AStar({ walkable: e => e === 0 });
  aster
    .findPath(new Point(0, 0), new Point(1, 1), map)
    .forEach(point => map.put(point, "*"));
  assert(
    `${map}` ===
      stripIndents`* *
                   0 *`
  );

  map.fill(0);
  map.put(new Point(1, 0), 1);
  map.put(new Point(0, 1), 1);
  aster
    .findPath(new Point(0, 0), new Point(1, 1), map)
    .forEach(point => map.put(point, "*"));
  assert(
    `${map}` ===
      stripIndents`0 1
                   1 0`
  );

  map.fill(0);
  map.put(new Point(1, 0), 1);
  aster
    .findPath(new Point(0, 0), new Point(1, 1), map)
    .forEach(point => map.put(point, "*"));
  assert(
    `${map}` ===
      stripIndents`* 1
                   * *`
  );
});

test("diagonal move: Always", () => {
  const map = new DataGrid<number | "*">(2, 2);
  map.fill(0);
  const aster = new AStar({ diagonalMovement: Always, walkable: e => e === 0 });
  aster
    .findPath(new Point(0, 0), new Point(1, 1), map)
    .forEach(point => map.put(point, "*"));
  assert(
    `${map}` ===
      stripIndents`* 0
                   0 *`
  );
  map.fill(0);
  map.put(new Point(1, 0), 1);
  map.put(new Point(0, 1), 1);
  aster
    .findPath(new Point(0, 0), new Point(1, 1), map)
    .forEach(point => map.put(point, "*"));
  assert(
    `${map}` ===
      stripIndents`* 1
                   1 *`
  );
});

test("diagonal move: IfAtMostOneObstacle", () => {
  const map = new DataGrid<number | "*">(2, 2);
  map.fill(0);
  const aster = new AStar({
    diagonalMovement: IfAtMostOneObstacle,
    walkable: e => e === 0
  });
  aster
    .findPath(new Point(0, 0), new Point(1, 1), map)
    .forEach(point => map.put(point, "*"));
  assert(
    `${map}` ===
      stripIndents`* 0
                   0 *`
  );

  map.fill(0);
  map.put(new Point(1, 0), 1);
  map.put(new Point(0, 1), 1);
  aster
    .findPath(new Point(0, 0), new Point(1, 1), map)
    .forEach(point => map.put(point, "*"));
  assert(
    `${map}` ===
      stripIndents`0 1
                   1 0`
  );

  map.fill(0);
  map.put(new Point(1, 0), 1);
  aster
    .findPath(new Point(0, 0), new Point(1, 1), map)
    .forEach(point => map.put(point, "*"));
  assert(
    `${map}` ===
      stripIndents`* 1
                   0 *`
  );

  map.fill(0);
  map.put(new Point(0, 1), 1);
  aster
    .findPath(new Point(0, 0), new Point(1, 1), map)
    .forEach(point => map.put(point, "*"));
  assert(
    `${map}` ===
      stripIndents`* 0
                   1 *`
  );
});

test("diagonal move: OnlyWhenNoObstacles", () => {
  const map = new DataGrid<number | "*">(2, 2);
  map.fill(0);
  const aster = new AStar({
    diagonalMovement: OnlyWhenNoObstacles,
    walkable: e => e === 0
  });
  aster
    .findPath(new Point(0, 0), new Point(1, 1), map)
    .forEach(point => map.put(point, "*"));
  assert(
    `${map}` ===
      stripIndents`* 0
                   0 *`
  );

  map.fill(0);
  map.put(new Point(1, 0), 1);
  map.put(new Point(0, 1), 1);
  aster
    .findPath(new Point(0, 0), new Point(1, 1), map)
    .forEach(point => map.put(point, "*"));
  assert(
    `${map}` ===
      stripIndents`0 1
                   1 0`
  );

  map.fill(0);
  map.put(new Point(1, 0), 1);
  aster
    .findPath(new Point(0, 0), new Point(1, 1), map)
    .forEach(point => map.put(point, "*"));
  assert(
    `${map}` ===
      stripIndents`* 1
                   * *`
  );

  map.fill(0);
  map.put(new Point(0, 1), 1);
  aster
    .findPath(new Point(0, 0), new Point(1, 1), map)
    .forEach(point => map.put(point, "*"));
  assert(
    `${map}` ===
      stripIndents`* *
                   1 *`
  );
});
