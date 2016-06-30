// Enemies our player must avoid
var Enemy = function(y, speed) {
    this.x = -101;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// moves ememies across the screen
Enemy.prototype.update = function(dt) {

  updatedSpeed = this.speed * dt;
  this.x += updatedSpeed;
  // clear enemies halo effect
  ctx.clearRect(0,0,canvas.width, canvas.height);
  if (this.x > canvas.width){
    this.x = -101;
    // changes the variation in speed of the ememies
    this.speed = randomRange(50, 200);
  }
//work on this to know when the ememy gets attacked
  if ((this.x - 50 <= player.x === this.x +50 >= player.x) 
      && this.y === player.y) {
      player.reset();
      
  }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};