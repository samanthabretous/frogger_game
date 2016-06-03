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
  ctx.clearRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT);
  if (this.x > CANVAS_WIDTH){
    this.x = -101;
    // changes the variation in speed of the ememies
    this.speed = randomRange(50, 200);
  }

//work on this to know when the ememy gets attacked
  if ((this.x-50 <= player.x === this.x+50 >= player.x) 
      && this.y === player.y) {
      player.reset();
  }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// Player
var Player = function(){
  this.reset();
  this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function(dt){
  if (this.y < 20){
    alert("you won the game!");
    this.reset();
  }



}

// Send player back to start
Player.prototype.reset = function() {
    this.x = 303;
    this.y = 478;
};

// Draw the player on the screen, required method for game
Player.prototype.render = function(){
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//Move player with key codes
Player.prototype.handleInput = function(direction){
  if (direction === 'left' && this.x > 0){
    this.x -= 101;
  } else if (direction === 'right' && this.x < 404){
    this.x +=101;
  } else if (direction === 'up' && this.y >0){
    this.y -= 83;
  } else if (direction === 'down' && this.y < 332){
    this.y +=83;
  }
  console.log(this.y);
}



// Instantiate your objects. and allows the renderEntites to run

var allEnemies = [new Enemy(63, 150), new Enemy(146, 100), new Enemy(229, 75), new Enemy(312, 125), new Enemy(395, 95)];
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

var randomRange = function(low, high) {       
  return Math.round(low+((high-low)*Math.random())); 
}

