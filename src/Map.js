// @flow

import either from './utils/either'
import range from './utils/range'
import { rect } from './matrix'
import Point from './Point'

type Privates = {
  width: number,
  height: number,
  raw: Array<number>,
}

type Size = {
  width: number,
  height: number,
}

function isPositive(number): boolean {
  return number >= 0
}

function convertRawIndex({ x, y }: Point, { width }: Map): number {
  return either(y, isPositive)(0) * width + either(x, isPositive)(0)
}

const privates: WeakMap<Map, Privates> = new WeakMap()

export default class Map {
  constructor(width: number = 0, height: number = 0) {
    privates.set(this, {
      width: width,
      height: height,
      raw: new Array(width * height),
    })
  }

  get width(): number {
    const fields = privates.get(this)
    if (fields) return fields.width
    throw new Error('nothing privates!')
  }

  get height(): number {
    const fields = privates.get(this)
    if (fields) return fields.height
    throw new Error('nothing privates!')
  }

  get raw(): Array<number> {
    const fields = privates.get(this)
    return fields ? [...fields.raw] : []
  }

  isOverRange(point: Point) {
    const { x, y } = point
    if (x < 0 || y < 0) return true
    return x >= this.width || y >= this.height
  }

  fill(element: any) {
    const fields = privates.get(this)
    if (fields) fields.raw.fill(element)
  }

  put(point: Point, element: any) {
    if (this.isOverRange(point)) return
    const fields = privates.get(this)
    if (!fields) throw new Error('nothing privates!')
    fields.raw[convertRawIndex(point, this)] = element
  }

  pick(point: Point) {
    if (this.isOverRange(point)) return
    const fields = privates.get(this)
    if (!fields) throw new Error('nothing privates!')
    return fields.raw[convertRawIndex(point, this)]
  }

  pickOut(point: Point) {
    if (this.isOverRange(point)) return
    const result = this.pick(point)
    this.put(point, undefined)
    return result
  }

  paste(point: Point, map: Map) {
    const pasteRect = rect(point, map.width, map.height)
    map.raw.forEach((element, index) => {
      const point = pasteRect[index]
      if (this.isOverRange(point)) return
      this.put(point, element)
    })
  }

  clip(point: Point, size: Size) {
    if (this.isOverRange(point)) return
    const result = new Map(size.width, size.height)
    const clipRect = rect(point, size.width, size.height)
    rect(new Point(0, 0), size.width, size.height).forEach((point, index) => {
      result.put(point, this.pick(clipRect[index]))
    })
    return result
  }
}
