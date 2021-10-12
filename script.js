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
function curve(points) {
  // move to the first point
  ctx.moveTo(points[0].x, points[0].y);


  for (i = 1; i < points.length - 2; i++) {
    var xc = (points[i].x + points[i + 1].x) / 2;
    var yc = (points[i].y + points[i + 1].y) / 2;
    ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
  }
  // curve through the last two points
  ctx.quadraticCurveTo(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
}
makeEgg(100, 100, 55, 100)