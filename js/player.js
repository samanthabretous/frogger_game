var Player = function(){
  this.reset();
}

Player.prototype.update = function(dt){
  if (this.y < 50){
    levelUp();
    this.reset();
  }
  this.selected();  
}

//user clicks on a different character and re-assigns this.sprite 
Player.prototype.selected = function(){

  if (!this.sprite){
    return this.sprite = hero;
  } else if (this.sprite != hero){
    return this.sprite = hero;
  }
    
} 

// Send player back to start
Player.prototype.reset = function() {
    this.x = 303;
    this.y = 478;

};

// Draw the player on the screen, required method for game
Player.prototype.render = function(){
  if(this.sprite){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  } else {
    ctx.font = "45px Oswald";
    ctx.textAlign = "center"
    ctx.fillText("Please select your hero", canvas.width/2, canvas.height/2 )
  }
}

//Move player with key codes
Player.prototype.handleInput = function(direction){
  if (direction === 'left' && this.x > 0){
    this.x -= BLOCK_SIZE_X;
  } else if (direction === 'right' && this.x < 404){
    this.x +=BLOCK_SIZE_X;
  } else if (direction === 'up' && this.y > 0){
    this.y -= BLOCK_SIZE_Y;
  } else if (direction === 'down' && this.y < 332){
    this.y +=BLOCK_SIZE_Y;
  }

}

