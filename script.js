let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")
let width = window.innerWidth
let height = window.innerHeight
canvas.width = width
canvas.height = height
let methodList = [3, 4]
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
function subDivideEgg(path, methods) {
  let length = path.length
  let triangle = [path[0], path[Math.floor(length / 3)], path[Math.floor(length / 3) * 2]]
  let l_half = Math.round(length / 2)
  let triangle_flipped = [path[0 + l_half], path[Math.floor(length / 3) + Math.round(l_half*1.1111)], path[(Math.floor(length / 3) * 2 + Math.round(l_half*0.9)) % length]]
  if (true/*Math.random() < 0.5*/) {
    //not flipped
    let oTriangles = []
    oTriangles.push([
      triangle[2],
      triangle_flipped[0],
      triangle[1]
    ])
    oTriangles.push([
      triangle[0],
      triangle_flipped[1],
      triangle[2]
    ])
    oTriangles.push([
      triangle[1],
      triangle_flipped[2],
      triangle[0]
    ])
    drawTriangle(triangle)
    subDivideTriangle(triangle, methods)
    for(let t of oTriangles){
      subDivideTriangle(t,methods)
    }
  } else {
    //flipped
    drawTriangle(pts)
    subDivideTriangle(pts, methods)
  }
}
function ptBetween(a, b) {
  if (Array.isArray(a)) {
    let x = 0
    let y = 0
    for (let pt of a) {
      x += pt.x
      y += pt.y
    }
    x /= a.length
    y /= a.length
    return { x, y }
  } else {
    return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }
  }
}
function subDivideTriangle(pts, methods, step = 0) {
  let method = methods[step]
  let nTriangles = []
  switch (method) {
    case 4: {
      let centerPts = [
        ptBetween(pts[0], pts[1]),
        ptBetween(pts[1], pts[2]),
        ptBetween(pts[0], pts[2]),
      ]
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
    case 3: {
      let centerPt = ptBetween(pts)
      console.log(centerPt)
      nTriangles.push([
        pts[0],
        pts[2],
        centerPt
      ])
      nTriangles.push([
        pts[0],
        pts[1],
        centerPt
      ])
      nTriangles.push([
        pts[1],
        pts[2],
        centerPt
      ])

      break;
    }
  }
  if (step < methods.length) {
    for (let triangle of nTriangles) {
      drawTriangle(triangle)
      subDivideTriangle(triangle, methods, step + 1)
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
let methods = [4, 3, 3]
subDivideEgg(path, methods)