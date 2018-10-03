// @flow

export default function lerp(start: number, end: number, t: number = 0) {
  return start + t * (end - start)
}
