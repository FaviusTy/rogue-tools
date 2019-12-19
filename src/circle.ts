import Point from "./Point";

const { floor } = Math;

// fixed N.5
export function beautifyRadius(radius: number) {
  const integer = floor(radius);
  return integer + 0.5;
}

//see: https://www.redblobgames.com/grids/circle-drawing/
export function insideCircle(center: Point, target: Point, radius: number) {
  const distance = center.sub(target);
  const squared = distance.mul(distance);
  return squared.x + squared.y < radius * radius;
}
