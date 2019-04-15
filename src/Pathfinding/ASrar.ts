import Heap from "heap";
import {
  DiagonalMovement,
  Never,
  OnlyWhenNoObstacles,
  IfAtMostOneObstacle
} from "./DiagonalMovement";
import backtrace from "./utils/backtrack";
import Heuristic, { HeuristicFunc } from "./Heuristic";
import Map from "../Map";
import Point from "../Point";
import Node from "./Node";
import Neighbors from "../Neighbors";

type Options = {
  allowDiagonal?: boolean;
  dontCrossCorners?: boolean;
  diagonalMovement?: DiagonalMovement;
  heuristic?: HeuristicFunc;
  weight?: number;
  neigbors?: Neighbors;
};

export default class AStar {
  allowDiagonal: boolean;
  dontCrossCorners: boolean;
  heuristic: HeuristicFunc;
  weight: number;
  diagonalMovement: number | undefined;
  neighbors: Neighbors;

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
    this.diagonalMovement = options.diagonalMovement;

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
   * @return {number[][]} The path, including both start and
   *     end positions.
   */
  findPath<E>(start: Point, end: Point, grid: Map<E>) {
    const openList = new Heap((nodeA: Node, nodeB: Node) => {
      return nodeA.cost - nodeB.cost;
    });
    const startNode: Node = new Node(start);
    const endNode: Node = new Node(end);
    const { SQRT2 } = Math;

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
        return backtrace(endNode);
      }

      // get neigbours of the current node
      const neighbors = this.neighbors.arounds(node).map(point => {
        return new Node(point);
      });
      neighbors.forEach(neighbor => {
        if (neighbor.closed) return;
        const { x, y } = neighbor;

        // get the distance between current node and the neighbor
        // and calculate the next g score
        const ng =
          node.g_cost + (x - node.x === 0 || y - node.y === 0 ? 1 : SQRT2);

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
          } else {
            // the neighbor can be reached with smaller cost.
            // Since its f value has been updated, we have to
            // update its position in the open list
            openList.updateItem(neighbor);
          }
        }
      }); // end for each neighbor
    } // end while not open list empty

    // fail to find the path
    return [];
  }
}
