import Point from "./Point";

export function insideCircle(center: Point, target: Point, radius: number) {
  const distance = center.sub(target);
  const squared = distance.mul(distance);
  return squared.x + squared.y < radius * radius;
}
