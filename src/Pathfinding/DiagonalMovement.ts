export const Always = 0 as const;
export const Never = 1 as const;
export const IfAtMostOneObstacle = 2 as const;
export const OnlyWhenNoObstacles = 4 as const;

export type DiagonalMovement =
  | typeof Always
  | typeof Never
  | typeof IfAtMostOneObstacle
  | typeof OnlyWhenNoObstacles;
