import { fromEvent } from 'most'
import Point from '../../src/Point'
import Neighbors from '../../src/Neighbors'
import { rect } from '../../src/matrix'
import Map from '../../src/Map'
import GameStates from './libs/GameStates'

const neighbors4 = new Neighbors(4)
const Game = new GameStates({ player: new Point(0, 0) })

const MovableCodes = ['h', 'j', 'k', 'l']

const dpr = window.devicePixelRatio || 1
const canvas = document.querySelector('#screen')
const ctx = canvas.getContext('2d')
const fontSize = 14
const fillWidth = fontSize / 2 + 1
const fillHeight = fontSize

const map = new Map(60, 30)
map.fill('.')

const keyup = fromEvent('keyup', document)
  .map(({ key }) => key)
  .filter(e => MovableCodes.includes(e))
  .tap(e => console.log('keyup:', e))
  .map(e => {
    const current = Game.state.player
    if (e === 'h') return neighbors4.left(current)
    if (e === 'j') return neighbors4.up(current)
    if (e === 'k') return neighbors4.down(current)
    if (e === 'l') return neighbors4.right(current)
  })
  .filter(nextPoint => !map.isOverRange(nextPoint))
  .tap(nextPoint => console.log('point', nextPoint.x, nextPoint.y))
  .observe(nextPoint => {
    Game.update(state => {
      state.player = nextPoint
    })
  })

const renderCell = (charcter, point) => {
  ctx.fillStyle = 'rgb(0, 0, 0)'
  ctx.fillRect(fillWidth * point.x, fillHeight * point.y, fillWidth, fillHeight)
  ctx.fillStyle = 'rgb(255, 255, 255)'
  return ctx.fillText(charcter, fillWidth * point.x, fillHeight * (point.y + 1))
}

function roop() {
  canvas.width = window.innerWidth * dpr
  canvas.height = window.innerHeight * dpr
  ctx.scale(dpr, dpr)
  ctx.font = `${fontSize}px 'Courier New'`
  rect(new Point(0, 0), map.width, map.height).forEach(point => {
    renderCell(map.pick(point), point)
  })
  renderCell('@', Game.state.player)
  requestAnimationFrame(roop)
}

roop()
