import Point from "../Point";

/**
 * Manhattan distance.
 * @param {number} dx - Difference in x.
 * @param {number} dy - Difference in y.
 * @return {number} dx + dy
 */
export function manhattan({ x, y }: Point) {
  return x + y;
}

/**
 * Euclidean distance.
 * @param {number} dx - Difference in x.
 * @param {number} dy - Difference in y.
 * @return {number} sqrt(dx * dx + dy * dy)
 */
export function euclidean({ x, y }: Point) {
  return Math.sqrt(x * x + y * y);
}

/**
 * Octile distance.
 * @param {number} dx - Difference in x.
 * @param {number} dy - Difference in y.
 * @return {number} sqrt(dx * dx + dy * dy) for grids
 */
export function octile({ x, y }: Point) {
  var F = Math.SQRT2 - 1;
  return x < y ? F * x + y : F * y + x;
}

/**
 * Chebyshev distance.
 * @param {number} dx - Difference in x.
 * @param {number} dy - Difference in y.
 * @return {number} max(dx, dy)
 */
export function chebyshev({ x, y }: Point) {
  return Math.max(x, y);
}

export type HeuristicFunc = (difference: Point) => number;

export default {
  manhattan,
  euclidean,
  octile,
  chebyshev
};
