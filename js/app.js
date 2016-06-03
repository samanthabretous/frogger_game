// Enemies our player must avoid
var Enemy = function(y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = -101;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.


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

}

// Send player back to start
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 404;
};

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
}



// Instantiate your objects. and allows the renderEntites to run

var allEnemies = [new Enemy(63, 150), new Enemy(146, 100), new Enemy(229, 75)];
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

function chooseRandomFrom(array){
    return array[Math.floor(Math.random() * array.length)];
}

