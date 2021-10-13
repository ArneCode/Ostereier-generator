let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")
ctx.lineWidth = 0.01
let width = 800*3
let height = 800*3
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
function drawEgg(path,color) {
  console.log(path)
  ctx.beginPath()
  ctx.moveTo(path[0].x, path[0].y)
  for (let i in path) {
    ctx.lineTo(path[i].x, path[i].y)
  }
  ctx.lineWidth=3
  ctx.strokeStyle = "black"
  ctx.stroke()
  ctx.fillStyle=color
  ctx.fill()
  ctx.lineWidth=1
}
function subDivideEgg(path, methods, colors) {
  let length = path.length
  let triangle = [path[0], path[Math.floor(length / 3)], path[Math.floor(length / 3) * 2]]
  let l_half = Math.round(length / 2)
  let triangle_flipped = [path[0 + l_half], path[Math.floor(length / 3) + Math.round(l_half * 1.1111)], path[(Math.floor(length / 3) * 2 + Math.round(l_half * 0.9)) % length]]
  if (Math.random() < 0.5/**/) {
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
    strokeTriangle(triangle)
    subDivideTriangle(triangle, methods, colors)
    for (let t of oTriangles) {
      subDivideTriangle(t, methods, colors)
    }
  } else {
    //flipped
    let oTriangles = []
    oTriangles.push([
      triangle_flipped[2],
      triangle[0],
      triangle_flipped[1]
    ])
    oTriangles.push([
      triangle_flipped[0],
      triangle[1],
      triangle_flipped[2]
    ])
    oTriangles.push([
      triangle_flipped[1],
      triangle[2],
      triangle_flipped[0]
    ])
    strokeTriangle(triangle_flipped)
    subDivideTriangle(triangle_flipped, methods, colors)
    for (let t of oTriangles) {
      subDivideTriangle(t, methods, colors)
    }
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
function subDivideTriangle(pts, methods, colors, step = 0) {
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
    case 2:{
      nTriangles=splitTriangle2(pts[1],pts[2],pts[0])
      break;
    }
  }
  if (step+1 < methods.length) {
    for (let triangle of nTriangles) {
      //strokeTriangle(triangle)
      subDivideTriangle(triangle, methods, colors, step + 1)
    }
  } else {
    for (let i = 0; i < nTriangles.length; i++) {
      fillTriangle(nTriangles[i], colors[i])
    }
  }
}
function splitTriangle2(a,b,c){
  let center=ptBetween(a,b)
  let t1=[
    center,
    a,
    c
  ]
  let t2=[
    center,
    b,
    c
  ]
  return [t1,t2]
}
function fillTriangle(pts,color){
  ctx.beginPath()
  moveTo(pts[0].x, pts[0].y)
  for (let i = 0; i < pts.length; i++) {
    let pt = pts[i]
    ctx.lineTo(pt.x, pt.y)
  }
  ctx.closePath()
  ctx.fillStyle = color
  ctx.fill()
}
function strokeTriangle(pts) {
  ctx.beginPath()
  moveTo(pts[0].x, pts[0].y)
  for (let i = 0; i < pts.length; i++) {
    let pt = pts[i]
    ctx.lineTo(pt.x, pt.y)
  }
  ctx.closePath()
  ctx.strokeStyle = "black"
  ctx.stroke()
}
let scale = 5
let b = 50 + (Math.random() - 0.5) * 5
let path = makeEggPath(b * scale+10, 70 * scale+10, 70 * scale, b * scale, 22 * scale)
let colors = colourschemes[Math.floor(Math.random() * colourschemes.length)]
drawEgg(path,colors[Math.floor(Math.random()*3)])
let methods = [2, 3, 3,4]
subDivideEgg(path, methods, colors)