function Orbiter(loc,amp,clr,theta,aVel){
  this.loc = loc;
  this.amp = amp;
  this.clr = clr;
  this.theta = theta;
  this.aVel = aVel;
}

Orbiter.prototype.update = function(){
  this.theta += this.aVel;
  this.loc.setDirection(this.theta);
  this.loc.x = movers[0].loc.x + Math.cos(this.theta)*this.amp;
  this.loc.y = movers[0].loc.y + Math.sin(this.theta)*this.amp;
  this.render();
}

Orbiter.prototype.render = function(){
  ctx.fillStyle = this.clr;
  ctx.beginPath();
  ctx.arc(this.loc.x, this.loc.y, 0, Math.PI*2,0,false);
  ctx.stroke();
  ctx.fill();
}
