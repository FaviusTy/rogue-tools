/**
 * This code is based on the following repository
 * https://github.com/qiao/PathFinding.js
 *
 */

import Heap from "heap";
import {
  DiagonalMovement,
  Never,
  OnlyWhenNoObstacles,
  IfAtMostOneObstacle,
  diagonalWalkable
} from "./DiagonalMovement";
import Heuristic, { HeuristicFunc } from "./Heuristic";
import Map from "../Map";
import Point from "../Point";
import Node from "./Node";
import NodeBucket from "./NodeBucket";
import Neighbors from "../Neighbors";
import exists from "../utils/exsits";

function defaultWalkable(entity?: any) {
  return exists(entity);
}

function defaultCalcCost(entity: any) {
  return entity && typeof entity === "number" ? entity : 1;
}

type CalcCostFunc = typeof defaultCalcCost;

type WalkableFunc = typeof defaultWalkable;

type Options = {
  allowDiagonal?: boolean;
  dontCrossCorners?: boolean;
  diagonalMovement?: DiagonalMovement;
  heuristic?: HeuristicFunc;
  weight?: number;
  neigbors?: Neighbors;
  walkable?: WalkableFunc;
  calcCost?: CalcCostFunc;
};

const { SQRT2 } = Math;

export default class AStar {
  heuristic: HeuristicFunc;
  weight: number;
  diagonalMovement: DiagonalMovement;
  neighbors: Neighbors;
  walkable: WalkableFunc;
  calcCost: CalcCostFunc;
  /**
   * A* path-finder. Based upon https://github.com/bgrins/javascript-astar
   * @constructor
   * @param {Options} options
   */
  constructor(options: Options) {
    this.heuristic = options.heuristic || Heuristic.manhattan;
    this.weight = options.weight || 1;
    this.neighbors = new Neighbors(8);
    this.diagonalMovement = options.diagonalMovement || Never;
    this.walkable = options.walkable || defaultWalkable;
    this.calcCost = options.calcCost || defaultCalcCost;

    // When diagonal movement is allowed the manhattan heuristic is not
    //admissible. It should be octile instead
    if (this.diagonalMovement === Never) {
      this.heuristic = options.heuristic || Heuristic.manhattan;
    } else {
      this.heuristic = options.heuristic || Heuristic.octile;
    }
  }

  /**
   * Find and return the the path.
   * @return {Point[]} The path, including both start and
   *     end positions.
   */
  findPath<E>(start: Point, end: Point, grid: Map<E>): Point[] {
    const openList = new Heap((nodeA: Node, nodeB: Node) => {
      return nodeA.cost - nodeB.cost;
    });
    const startNode = new Node(start);
    const endNode = new Node(end);
    const bucket = new NodeBucket([startNode, endNode]);

    // set the `g` and `f` value of the start node to be 0
    startNode.g_cost = 0;

    // push the start node into the open list
    openList.push(startNode);
    startNode.open();

    // while the open list is not empty
    while (!openList.empty()) {
      // pop the position of node which has the minimum `f` value.
      const node = openList.pop();
      node.close();

      // if reached the end position, construct the path and return it
      if (node === endNode) {
        return endNode.backtrack();
      }

      // get neigbours of the current node
      const neighbors = this.neighbors.arounds(node.point).map(point => {
        return point && point.x >= 0 && point.y >= 0
          ? bucket.pick(point)
          : null;
      });

      // walable mapping.
      const walkables = diagonalWalkable(
        this.diagonalMovement,
        neighbors.map(node =>
          node ? this.walkable(grid.pick(node.point)) : false
        )
      );

      for (const neighbor of neighbors.filter(
        (_, index): _ is Node => walkables[index]
      )) {
        if (!neighbor || neighbor.closed) continue;
        const { x, y } = neighbor;

        // get the distance between current node and the neighbor
        // and calculate the next g score
        const base_cost = this.calcCost(grid.pick(node.point));
        const ng =
          base_cost + (x - node.x === 0 || y - node.y === 0 ? 1 : SQRT2);

        // check if the neighbor has not been inspected yet, or
        // can be reached with smaller cost from the current node
        if (!neighbor.opened || ng < neighbor.g_cost) {
          neighbor.g_cost = ng;
          neighbor.h_cost =
            neighbor.h_cost ||
            this.weight * this.heuristic(neighbor.point.sub(end).abs);
          neighbor.parent = node;

          if (!neighbor.opened) {
            openList.push(neighbor);
            neighbor.open();
            continue;
          }

          // the neighbor can be reached with smaller cost.
          // Since its f value has been updated, we have to
          // update its position in the open list
          openList.updateItem(neighbor);
        }
      }
    }

    // fail to find the path
    return [];
  }
}
