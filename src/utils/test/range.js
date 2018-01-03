import Runner from 'eater/runner'
import assert from 'power-assert'
import range from '../range'
const test = Runner.test

test('それは length に与えた長さと連番を持つ配列を返す', () => {
  const result = range(5)
  assert(result.length === 5)
  assert(result[0] === 0)
  assert(result[4] === 4)
  assert(result[5] === undefined)
})

test('それは start を与えた場合に配列の要素を start の値を起点とした連番で生成する', () => {
  const result = range(10, 1)
  assert(result.length === 10)
  assert(result[0] === 1)
  assert(result[9] === 10)
  assert(result[10] === undefined)
})
