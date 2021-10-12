let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")
let width = window.innerWidth
let height = window.innerHeight
canvas.width = width
canvas.height = height
function makeEggPath(xPos,yPos,a,b,d) {
  let pathL=[]
  let pathR=[]
  for(let y=-a;y<=a;y+=1.5){
    let x=Math.sqrt(((-(b**(2))*(y**(2))+(b**(2))*(a**(2)))/(((a**(2))+2*d*y+(d**(2))))))
    pathL.push({x:-x+xPos,y:(y*-1)+yPos})
    pathR.push({x:x+xPos,y:(y*-1)+yPos})
  }
  //console.log(pathL)
  return pathL.concat(pathR.reverse())
}
function drawPath(path){
  console.log(path)
  ctx.beginPath()
  ctx.moveTo(path[0].x,path[0].y)
  for(let i in path){
    ctx.lineTo(path[i].x,path[i].y)
  }
  ctx.strokeStyle="black"
  ctx.stroke()
  ctx.beginPath()
  ctx.rect(100,100,3,3)
  ctx.fill()
}
function subDivideEgg(path){
  let length=path.length
  let pts=[path[0],path[Math.floor(length/3)],path[Math.floor(length/3)*2]]
  ctx.beginPath()
  moveTo(pts[0].x,pts[0].y)
  for(let i=1;i<pts.length;i++){
    let pt=pts[i]
    ctx.lineTo(pts[0].x,pts[0].y)
  }
  ctx.fillStyle="red"
  ctx.fill()
}
let b=50+(Math.random()-0.5)*5
let path=makeEggPath(100, 100, 70,b,22)
subDivideEgg(path)
