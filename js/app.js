var hero // global varible
var BLOCK_SIZE_X = 101 // global varible
var BLOCK_SIZE_Y = 83 // global varible

var randomRange = function(low, high) {       
  return Math.round(low+((high-low)*Math.random())); 
}

// Instantiate your objects. and allows the renderEntites to run

var allEnemies = [new Enemy(63, randomRange(75,150)), 
                  new Enemy(146, randomRange(75,150)), 
                  new Enemy(229, randomRange(75,150)), 
                  new Enemy(312, randomRange(75,150)), 
                  new Enemy(395, randomRange(75,150))];
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(event) {
    //event.preventDefault();
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[event.keyCode]);
});

