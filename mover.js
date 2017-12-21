function Mover(loc, vel, rad, clr, acc){
  this.loc = loc;
  this.vel = vel;
  this.rad = rad;
  this.clr = clr;
  this.acc = acc;
}

function Attractor(loc,vel,len,clr){
  this.loc = loc;
  this.vel = vel;
  this.len = len;
  this.clr = clr;
}

function Repeller(loc,vel,len,clr){
  this.loc = loc;
  this.vel = vel;
  this.len = len;
  this.clr = clr;
}

function Snake(clr){
  this.clr = clr;
  this.segs = [];
  this.numSegs = 5;
  this.radius = 10;
  this.segLength = 2*this.radius;
  for(let i =0; i < this.numSegs; i++){
      this.segs[i] = new JSVector(100, 100);
  }
}

Snake.prototype.update = function(){
      this.segs[0] = new JSVector(orbiter.loc.x, orbiter.loc.y);
      for(let i = 1; i < this.numSegs; i++){
        var distance = JSVector.subGetNew(this.segs[i], this.segs[i-1]);
        distance.setMagnitude(this.segLength);
        distance.add(this.segs[i-1]);
        this.segs[i] = distance;
        console.log(this.segs[i]);
      }
      this.render();
}

Snake.prototype.render = function(){
  for(let i = 0; i < this.segs.length; i++){
    ctx.fillStyle = this.clr;
    ctx.beginPath();
    ctx.arc(this.segs[i].x, this.segs[i].y, this.radius, Math.PI*2,0,false);
    ctx.stroke();
    ctx.fill();
  }
}

Mover.prototype.update = function(){
  this.loc.add(this.vel);
  this.vel.add(this.acc);
  if(this.loc.x <= this.rad*2){
      this.vel.x *= -1;
  }
  if(this.loc.y <= this.rad*2){
      this.vel.y *= -1;
  }
  if(this.loc.x >= window.innerWidth - this.rad*2){
      this.vel.x *= -1;
  }
  if(this.loc.y >= window.innerHeight - this.rad*2){
      this.vel.y *= -1;
  }
  this.render();
}

Mover.prototype.render = function(){
  console.log(this);
  ctx.fillStyle = this.clr;
  ctx.beginPath();
  ctx.arc(this.loc.x, this.loc.y, this.rad, Math.PI*2,0,false);
  ctx.stroke();
  ctx.fill();
}

// Mover.prototype.applyForce = function(JSVector force){
//   var desired = JSVector.subGetNew(this.vel, Attractor);
//   var steer = JSVector.subGetNew(this.vel)
//   this.acc.add(force);
// }

Attractor.prototype.update = function(){
  this.loc.add(this.vel);
  if(this.loc.x <= this.len){
      this.vel.x *= -1;
  }
  if(this.loc.y <= this.len){
      this.vel.y *= -1;
  }
  if(this.loc.x >= window.innerWidth - this.len){
      this.vel.x *= -1;
  }
  if(this.loc.y >= window.innerHeight - this.len){
      this.vel.y *= -1;
  }
  this.render();
}

Repeller.prototype.update = function(){
  this.loc.add(this.vel);
  if(this.loc.x <= this.len){
      this.vel.x *= -1;
  }
  if(this.loc.y <= this.len){
      this.vel.y *= -1;
  }
  if(this.loc.x >= window.innerWidth - this.len){
      this.vel.x *= -1;
  }
  if(this.loc.y >= window.innerHeight - this.len){
      this.vel.y *= -1;
  }
  this.render();
}

Attractor.prototype.render = function(){
  ctx.fillStyle = this.clr;
  ctx.beginPath();
  ctx.rect(this.loc.x, this.loc.y, this.len, this.len);
  ctx.stroke();
  ctx.fill();
}

Repeller.prototype.render = function(){
  ctx.fillStyle = this.clr;
  ctx.beginPath();
  ctx.rect(this.loc.x, this.loc.y, this.len,this.len);
  ctx.stroke();
  ctx.fill();
}

Mover.prototype.applyForce = function(force){
  this.vel.add(force);
}
//http://natureofcode.com/book/chapter-2-forces/
