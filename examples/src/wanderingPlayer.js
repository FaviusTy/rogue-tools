import { fromEvent } from 'most'
import Point from '../../src/Point'
import { rect } from '../../src/matrix'
import Map from '../../src/Map'

const keyup = fromEvent('keyup', document).observe(e => console.log('keyup', e))

const dpr = window.devicePixelRatio || 1
const canvas = document.querySelector('#screen')
const ctx = canvas.getContext('2d')
const fontSize = 14

const map = new Map(60, 30)
map.fill('.')

const renderCell = (charcter, point) => {
  return ctx.fillText(charcter, (fontSize / 2 + 1) * point.x, fontSize * point.y)
}

function roop() {
  canvas.width = window.innerWidth * dpr
  canvas.height = window.innerHeight * dpr
  ctx.scale(dpr, dpr)
  ctx.font = `${fontSize}px 'Courier New'`
  ctx.fillStyle = 'rgb(255, 255, 255)'
  rect(new Point(0, 0), map.width, map.height).forEach(point => {
    renderCell(map.pick(point), point)
  })
  renderCell('@', new Point(10, 5))
  requestAnimationFrame(roop)
}

roop()
