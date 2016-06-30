/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on player and enemy objects defined in app.js
 *
 * A game engine works by drawing the entire game screen over and over
*/

var Engine = (function(global) {

  var game = document.querySelector("#game");

   //Create Canvas Element
  canvas = document.createElement('canvas');
  canvas.width = 707;
  canvas.height = 680;
  ctx = canvas.getContext('2d');
  var lastTime;

  var mainGame = document.querySelector("#mainGameContainer")
  mainGame.insertBefore(canvas, mainGame.childNodes[0]);
  

  var allImagesNeeded = ['images/stone-block.png',
    'images/water-block.png',
    'images/grass-block.png',
    'images/enemy-bug.png',
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'];

  
  //display all the character options    
  var select = document.querySelectorAll('.select'); 

  for (i = 4; i < allImagesNeeded.length; i++){
    var character = document.createElement('img');
    character.setAttribute("class", "selectImage");
    character.setAttribute("src", allImagesNeeded[i]);
    select[0].appendChild(character);
  }

  //once player is selected add border around users choice
  function setSelectedClass(element) {
    if (document.querySelector(".selectedChoice")){
      document.querySelector(".selectedChoice").classList.remove("selectedChoice");         
    }

    element.classList.add("selectedChoice");
  }
  //user selects player
  function selected(){
    var selectImage = document.querySelectorAll('.selectImage');
    for (i = 0; i < selectImage.length; i++){
      selectImage[i].addEventListener('click',function(event){ 
        setSelectedClass(event.target);
          hero = event.target.getAttribute("src"); 
        return hero;                 
      });
    };      
  }
  
  selected();


  /* This function serves as the kickoff point for the game loop itself
   * and handles properly calling the update and render methods.
   */
  function main() {

    var now = Date.now(),
        dt = (now - lastTime) / 1000.0;

    /* Call our update/render functions, pass along the time delta to our update function for smooth animation.
     */
    update(dt);
    render(1,5,2);

    /* Set our lastTime variable which is used to determine the time delta for the next time this function is called.
     */
    lastTime = now;

    /* Use the browser's requestAnimationFrame function to call this
     * function again as soon as the browser is able to draw another frame.
     */
    global.window.requestAnimationFrame(main);
  }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
      reset();
      lastTime = Date.now();
      main();
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {
      updateEntities(dt);
    }

    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
      if(hero){ //only run enemies once player is selected
        allEnemies.forEach(function(enemy) {
          enemy.update(dt);
        });
      }
      player.update();

    }



    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render(water, road, grass) {
      /* This array holds the relative URL to the image used
       * for that particular row of the game level.
       */
      var rowImages = [];

      function createArrayRow(index, times){
       var i = 1;
        while (i <= times){
            rowImages.push(allImagesNeeded[index])
            i++;
        }     
      }
      createArrayRow(1,water); // water
      createArrayRow(0,road); // road
      createArrayRow(2,grass); // grass
  
      var numRows = rowImages.length,
          numCols = 7,
          row, col;

      /* Loop through the number of rows and columns we've defined above
       * and, using the rowImages array, draw the correct image for that
       * portion of the "grid"
       */
      for (row = 0; row < numRows; row++) {
        for (col = 0; col < numCols; col++) {
          ctx.drawImage(Resources.get(rowImages[row]), col * BLOCK_SIZE_X, row * BLOCK_SIZE_Y);
        }
      }

      renderEntities();
    }

    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });
        
        player.render();
    }

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset() {
        // noop
    }

    /* load all of the images we know we're going to need 
     */
    Resources.load(allImagesNeeded);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
    global.canvas = canvas;
})(this);
