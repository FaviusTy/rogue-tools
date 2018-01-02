import Runner from 'eater/runner'
import assert from 'power-assert'
import Point from '../Point'
import Map from '../Map'
const test = Runner.test

test('それは width と height の値から生成される', () => {
  const map = new Map(80, 60)
  assert(map instanceof Map)
})

test('それは row によって生成された空間を配列として返す', () => {
  const map = new Map(5, 5)
  assert(map.row.length === 5 * 5)
})

test('それが生成する空間配列の各要素の初期値はnullである', () => {
  const map = new Map(5, 5)
  map.row.forEach(v => v === null)
})

test('それは put によって指定した座標に対応する要素を保持する', () => {
  const map = new Map(5, 5)
  map.put(new Point(3, 3), true)
  assert(map.row[18])
})

test('それは pick によって与えられたPointに格納されている値を返す', () => {
  const map = new Map(5, 5)
  const point = new Point(1, 2)
  map.put(point, true)
  assert(map.pick(point))
})

test('それは pick に与えたPointが空間の範囲外だった時にundefinedを返す', () => {
  const map = new Map(5, 5)
  const overX = new Point(5, 0)
  const overY = new Point(1, 5)
  const overRange = new Point(5, 5)
  assert(map.pick(overX) === undefined)
  assert(map.pick(overY) === undefined)
  assert(map.pick(overRange) === undefined)
})
