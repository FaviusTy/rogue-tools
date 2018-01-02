import Runner from 'eater/runner'
import assert from 'power-assert'
import Point from '../Point'
const test = Runner.test

test('Point は引数 x, y の値を持つ', () => {
  const point = new Point(1, 2)
  assert(point.x === 1)
  assert(point.y === 2)
})

test('Point.key() でシリアライズされた文字列を受け取れる', () => {
  const point = new Point(10, 15)
  assert('10,15' === point.key)
})
