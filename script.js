let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")
let width = window.innerWidth / 2
let height = window.innerHeight / 2
canvas.width = width
canvas.height = height
function makeEgg(x, y, width, height, centerY) {
  ctx.beginPath()
  ctx.moveTo(x, y + height)
  ctx.bezierCurveTo(x + 100, y + height, x + 100, y - height / 2, x, y - height)
  ctx.bezierCurveTo(x - 100, y - height / 2, x - 100, y + height, x, y + height)
  ctx.closePath()
  ctx.fillStyle = "red"
  ctx.fill()
}
makeEgg(100, 100, 55, 100)