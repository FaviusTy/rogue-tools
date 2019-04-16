export const Always = 0;
export const Never = 1;
export const IfAtMostOneObstacle = 2;
export const OnlyWhenNoObstacles = 4;

export type DiagonalMovement =
  | typeof Always
  | typeof Never
  | typeof IfAtMostOneObstacle
  | typeof OnlyWhenNoObstacles;
