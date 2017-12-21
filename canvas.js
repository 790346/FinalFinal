window.onload = init;
var movers = [];
var ctx;
var canvas;
var attractor;
var repeller;
var orbiter;
var snake;
var particles = [];

function init(){
  canvas = document.getElementById('cnv')
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.border = 'solid yellow 3px';
  canvas.style.backgroundColor = 'orange';
  ctx = canvas.getContext('2d');
  createMovers(20);
  createAttractor();
  createRepeller();
  createOrbiters();
  makeParticles(15);
  animate();
}

function animate(){

  ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
  for(let i = 0; i < movers.length; i++){
    movers[i].update();
    if(Math.abs(movers[i].loc.x - attractor.loc.x) <= 100 && Math.abs(movers[i].loc.y - attractor.loc.y <=100)){
      var desired = JSVector.subGetNew(attractor.loc, movers[i].loc);
      desired.normalize();
      desired.mult(3);
      var steer = JSVector.subGetNew(desired, movers[i].vel);
      movers[i].applyForce(steer);
      //this.vel.add(steer);
      movers[i].vel.add(movers[i].acc);
      movers[i].loc.add(movers[i].vel);
    }
    if(Math.abs(movers[i].loc.x - repeller.loc.x) <= 100 && Math.abs(movers[i].loc.y - repeller.loc.y) <=100){
      var desired = JSVector.subGetNew(movers[i].loc, repeller.loc);
      desired.normalize();
      desired.mult(3);
      var steer = JSVector.subGetNew(desired, movers[i].vel);
      movers[i].applyForce(steer);
      //this.vel.add(steer);
      movers[i].vel.add(movers[i].acc);
      movers[i].loc.add(movers[i].vel);
    }
  }
  for(let i =0; i < particles.length; i++){
    particles[i].update();
  }
  attractor.update();
  repeller.update();
  orbiter.update();
  snake.update();

  requestAnimationFrame(animate);
}

function createMovers(numMovers){
  for(let i = 0; i < numMovers; i++){
    var radius = Math.random() *10 + 5;
    var x = Math.random()*window.innerWidth;
    var y = Math.random()*window.innerHeight;
    var dx = Math.random()*10;
    var dy = Math.random()*10;
    movers.push(new Mover(new JSVector(x,y), new JSVector(dx,dy), radius, randomColor(), new JSVector(0,0)));
  }
  orbiter = new Orbiter(new JSVector(x,y), 1, randomColor(), 0, Math.random()*1+0.1);
  snake = new Snake(randomColor());
}

function createAttractor(){
  var len = 25;
  var x = Math.random() * window.innerWidth;
  var y = Math.random()*window.innerHeight;
  var dx = Math.random()*7.5;
  var dy = Math.random()*7.5;
  attractor = new Attractor(new JSVector(x,y), new JSVector(dx,dy), len, 'blue');
}

function createRepeller(){
  var len = 25;
  var x = Math.random() * window.innerWidth;
  var y = Math.random()*window.innerHeight;
  var dx = Math.random()*7.5;
  var dy = Math.random()*7.5;
  repeller = new Repeller(new JSVector(x,y), new JSVector(dx,dy), len, 'black');
}

function createOrbiters(){
  var amp = 100;
  var x = movers[0].loc.x;
  var y = movers[0].loc.y;
  var angle = 0
  var angularVelocity = Math.random()*1+0.1;

}

// function makeParticles(numParticles){
//   for(var i = 0; i < numParticles; i++){
//       particles.push(new Particle(new JSVector(window.innerWidth/2, 50)));
//       // particles[i].update;
//   }
// }

function makeParticles(numParticles){
  for(var i = 1; i < numParticles; i++){
      particles.push(new Particle(new JSVector(window.innerWidth/2, 50)));
      particles[i].update();
      }
  }


function randomColor(){
  var r = Math.random() * 255|0;
  var g = Math.random() * 255|0;
  var b = Math.random() * 255|0;
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}
