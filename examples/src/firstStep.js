import Map from '../../src/Map'

const dpr = window.devicePixelRatio || 1
const canvas = document.querySelector('#screen')
const ctx = canvas.getContext('2d')
const fontSize = 11

function roop() {
  canvas.width = window.innerWidth * dpr
  canvas.height = window.innerHeight * dpr
  ctx.scale(dpr, dpr)
  ctx.font = `${fontSize}px 'Courier New'`
  ctx.fillStyle = 'rgb(255, 255, 255)'
  'Hello, world!'.split('').forEach((v, i) => ctx.fillText(v, (fontSize / 2 + 1) * i, fontSize))
  '##################'.split('').forEach((v, i) => ctx.fillText(v, (fontSize / 2 + 1) * i, fontSize * 2))
  requestAnimationFrame(roop)
}

roop()
