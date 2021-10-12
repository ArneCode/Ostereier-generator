let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")
let width = window.innerWidth
let height = window.innerHeight
canvas.width = width
canvas.height = height
function makeEggPath(xPos, yPos, a, b, d) {
  let pathL = []
  let pathR = []
  for (let y = -a; y <= a; y += 1.4) {
    let x = Math.sqrt(((-(b ** (2)) * (y ** (2)) + (b ** (2)) * (a ** (2))) / (((a ** (2)) + 2 * d * y + (d ** (2))))))
    pathL.push({ x: -x + xPos, y: (y * -1) + yPos })
    pathR.push({ x: x + xPos, y: (y * -1) + yPos })
  }
  //console.log(pathL)
  return pathL.concat(pathR.reverse())
}
function drawPath(path) {
  console.log(path)
  ctx.beginPath()
  ctx.moveTo(path[0].x, path[0].y)
  for (let i in path) {
    ctx.lineTo(path[i].x, path[i].y)
  }
  ctx.strokeStyle = "black"
  ctx.stroke()
}
function subDivideEgg(path, maxSteps) {
  let length = path.length
  let pts = [path[0], path[Math.floor(length / 3)], path[Math.floor(length / 3) * 2]]
  drawTriangle(pts)
  subDivideTriangle(pts, 4, maxSteps)
}
function ptBetween(a, b) {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }
}
function subDivideTriangle(pts, method, maxSteps, step = 0) {
  let nTriangles = []
  switch (method) {
    case 4: {
      let centerPts = [
        ptBetween(pts[0], pts[1]),
        ptBetween(pts[1], pts[2]),
        ptBetween(pts[0], pts[2]),
      ]
      drawTriangle(centerPts)
      nTriangles.push(centerPts)
      nTriangles.push([
        centerPts[2],
        centerPts[1],
        pts[2]
      ])
      nTriangles.push([
        centerPts[2],
        centerPts[0],
        pts[0]
      ])
      nTriangles.push([
        centerPts[1],
        centerPts[0],
        pts[1]
      ])
      break;
    }
  }
  if (step < maxSteps) {
    for (let triangle of nTriangles) {
      subDivideTriangle(triangle, 4, maxSteps, step + 1)
    }
  }
}
function drawTriangle(pts) {
  ctx.beginPath()
  moveTo(pts[0].x, pts[0].y)
  for (let i = 0; i < pts.length; i++) {
    let pt = pts[i]
    ctx.lineTo(pt.x, pt.y)
  }
  ctx.closePath()
  console.log(pts)
  ctx.strokeStyle = "black"
  ctx.stroke()
}
let b = 50 + (Math.random() - 0.5) * 5
let path = makeEggPath(100, 100, 70, b, 22)
drawPath(path)
subDivideEgg(path,3)
