import { NeighborIndexes } from "../Neighbors";

const { UP, RIGHT, BOTTOM, LEFT } = NeighborIndexes;

export const Always = 0;
export const Never = 1;
export const IfAtMostOneObstacle = 2;
export const OnlyWhenNoObstacles = 4;

export type DiagonalMovement =
  | typeof Always
  | typeof Never
  | typeof IfAtMostOneObstacle
  | typeof OnlyWhenNoObstacles;

export function diagonalWalkable(type: DiagonalMovement, around: boolean[]) {
  if (type === Never)
    return around.map(
      (walkable, index) => [0, 2, 4, 6].includes(index) && walkable
    );
  if (type === IfAtMostOneObstacle) {
    return [
      around[UP],
      around[UP] || around[RIGHT],
      around[RIGHT],
      around[RIGHT] || around[BOTTOM],
      around[BOTTOM],
      around[BOTTOM] || around[LEFT],
      around[LEFT],
      around[LEFT] || around[UP]
    ];
  }
  if (type === OnlyWhenNoObstacles) {
    return [
      around[UP],
      around[UP] && around[RIGHT],
      around[RIGHT],
      around[RIGHT] && around[BOTTOM],
      around[BOTTOM],
      around[BOTTOM] && around[LEFT],
      around[LEFT],
      around[LEFT] && around[UP]
    ];
  }
  return around;
}
