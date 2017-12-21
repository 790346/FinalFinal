var par = [];

function Particle(loc){
  this.loc = loc;
  this.vel = new JSVector(Math.random()*3-1.5, Math.random()**3-1.5);
  this.acc = new JSVector(0, 0.1);
  this.lifespan = 300;

  // Method to update position
  this.update = function(){
    this.vel.add(this.acc);
    this.loc.add(this.vel);
    this.lifespan -= 2;
    this.render();
  }
// Method to display
  this.render = function() {
    ctx.strokeStyle = "rgba(255, 255, 255, "+ this.lifespan/200 + ")";
    ctx.fillStyle = "rgba(255, 255, 255, "+ this.lifespan/200 + ")";
    ctx.beginPath();
    ctx.arc(this.loc.x,this.loc.y, 10, Math.PI*2, 0, false);
    ctx.stroke();
    ctx.fill();

  }
  // Is the particle still useful?
  this.isDead = function() {
    if (this.lifespan < 0.0) {
        return true;
    } else {
      return false;
    }
    console.log(this.lifespan);
}
}
