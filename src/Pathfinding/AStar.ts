import Heap from "heap";
import {
  DiagonalMovement,
  Never,
  OnlyWhenNoObstacles,
  IfAtMostOneObstacle,
  diagonalWalkable
} from "./DiagonalMovement";
import backtrace from "./utils/backtrack";
import Heuristic, { HeuristicFunc } from "./Heuristic";
import Map from "../Map";
import Point from "../Point";
import Node from "./Node";
import Neighbors from "../Neighbors";
import exists from "../utils/exsits";
import either from "../utils/either";

function defaultWalkable<T>(entity?: T) {
  return exists(entity);
}

type WalkableFunc = typeof defaultWalkable;

type Options = {
  allowDiagonal?: boolean;
  dontCrossCorners?: boolean;
  diagonalMovement?: DiagonalMovement;
  heuristic?: HeuristicFunc;
  weight?: number;
  neigbors?: Neighbors;
  walkable?: WalkableFunc;
};

const { SQRT2 } = Math;

export default class AStar {
  allowDiagonal: boolean;
  dontCrossCorners: boolean;
  heuristic: HeuristicFunc;
  weight: number;
  diagonalMovement: DiagonalMovement;
  neighbors: Neighbors;
  walkable: WalkableFunc;
  /**
   * A* path-finder. Based upon https://github.com/bgrins/javascript-astar
   * @constructor
   * @param {Options} options
   */
  constructor(options: Options) {
    this.allowDiagonal = !!options.allowDiagonal;
    this.dontCrossCorners = !!options.dontCrossCorners;
    this.heuristic = options.heuristic || Heuristic.manhattan;
    this.weight = options.weight || 1;
    this.neighbors = options.neigbors || new Neighbors(8);
    this.diagonalMovement = options.diagonalMovement || Never;
    this.walkable = options.walkable || defaultWalkable;

    if (!this.diagonalMovement) {
      if (!this.allowDiagonal) {
        this.diagonalMovement = Never;
      } else {
        if (this.dontCrossCorners) {
          this.diagonalMovement = OnlyWhenNoObstacles;
        } else {
          this.diagonalMovement = IfAtMostOneObstacle;
        }
      }
    }

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
  findPath<E extends { cost: number }>(
    start: Point,
    end: Point,
    grid: Map<E>
  ): Point[] {
    const openList = new Heap((nodeA: Node, nodeB: Node) => {
      return nodeA.cost - nodeB.cost;
    });
    const startNode = new Node(start);
    const endNode = new Node(end);

    // set the `g` and `f` value of the start node to be 0
    startNode.g_cost = 0;

    // push the start node into the open list
    openList.push(startNode);

    let debug = 0;

    // while the open list is not empty
    while (!openList.empty()) {
      if (debug > 120) return [];
      // pop the position of node which has the minimum `f` value.
      const node = openList.pop();

      // if reached the end position, construct the path and return it
      console.log("node === endNode", node.point.key, endNode.point.key);
      if (node === endNode) return backtrace(endNode);

      // get neigbours of the current node
      const neighbors = this.neighbors.arounds(node.point).map(point => {
        return point && point.x >= 0 && point.y >= 0 ? new Node(point) : null;
      });

      // walable mapping.
      const walkables = diagonalWalkable(
        this.diagonalMovement,
        neighbors.map(node =>
          node ? this.walkable(grid.pick(node.point)) : false
        )
      );

      console.log(
        neighbors
          .filter((_, index): _ is Node => walkables[index])
          .map(n => n.point.key)
      );

      for (const neighbor of neighbors.filter(
        (_, index): _ is Node => walkables[index]
      )) {
        debug++;
        console.log("neighbor.state", neighbor.point.key, neighbor.state);
        if (neighbor.closed) continue;
        const { x, y } = neighbor;

        // get the distance between current node and the neighbor
        // and calculate the next g score
        const base_cost = either(grid.pick(node.point))({ cost: 0 }).cost;
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
            console.log("openList push", neighbor.point.key);
            openList.push(neighbor);
            neighbor.open();
            console.log("open", neighbor.point.key, neighbor.state);
          } else {
            // the neighbor can be reached with smaller cost.
            // Since its f value has been updated, we have to
            // update its position in the open list
            openList.updateItem(neighbor);
          }
        }
      }
    }

    // fail to find the path
    console.log("fail to path");
    return [];
  }
}
