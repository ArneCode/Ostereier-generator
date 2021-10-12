let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")
let width = window.innerWidth / 2
let height = window.innerHeight / 2
canvas.width = width
canvas.height = height
function makeEgg(x, y, width, height, centerY) {
  let downOff=20
  let arr=[
    {x:x-width,y:y+downOff},
    {x:x-width/1.5,y:y-height/1.5},
    {x:x,y:y-height}, 
    {x:x+width/1.5,y:y-height/1.5},
    {x:x+width,y:y+downOff},
    {x:x,y:y+height},
    {x:x-width,y:y+downOff},
    {x:x-width/1.5,y:y-height/1.5},
    {x:x,y:y-height}, 

  ]
  ctx.beginPath()
  customCurve(arr)
  //ctx.closePath()
  ctx.fillStyle = "red"
  ctx.fill()
}
function customCurve(points) {
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