var levelDisplay = document.querySelector("#levelDisplay")
var scoreDisplay = document.querySelector("#scoreDisplay")
var gameOver = false
var level = 1
var playerScore = 0
var winningScore = 3

function levelUp() {
  if(!gameOver){
    playerScore++
    scoreDisplay.textContent = playerScore
    if(playerScore === winningScore){
      level++
      levelDisplay.textContent = level
      winningScore += 3
      //gameOver = true
    }
  }
}

//user can enter a name for their character
var nameTracker = true
var nameInput = document.querySelector("#name")
var levelInfo = document.querySelectorAll('.levelInfo'); 
nameInput.addEventListener("change", function(event){
	if(nameTracker){ 	
		var greeting = document.createElement("h3");
		 levelInfo[0].insertBefore(greeting, levelInfo[0].childNodes[8]);
		greeting.textContent = "Hello " + this.value;
		this.value = ""
		nameTracker = false
	} else {
			document.querySelector(".levelInfo h3").textContent = "Hello " + this.value;
			this.value = ""
	}

})

