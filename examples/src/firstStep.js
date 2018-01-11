import Point from '../../src/Point'
import { rect } from '../../src/matrix'
import Map from '../../src/Map'

const dpr = window.devicePixelRatio || 1
const canvas = document.querySelector('#screen')
const ctx = canvas.getContext('2d')
const fontSize = 14

const map = new Map(60, 30)
map.fill('.')

function roop() {
  canvas.width = window.innerWidth * dpr
  canvas.height = window.innerHeight * dpr
  ctx.scale(dpr, dpr)
  ctx.font = `${fontSize}px 'Courier New'`
  ctx.fillStyle = 'rgb(255, 255, 255)'
  rect(new Point(0, 0), map.width, map.height).forEach(point => {
    ctx.fillText(map.pick(point), (fontSize / 2 + 1) * point.x, fontSize * point.y)
  })
  requestAnimationFrame(roop)
}

roop()
