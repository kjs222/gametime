require('./style.scss');

var Game = require("./game");
var MenuTyper = require("./menuTyper");
var Menu = require("./menu");
var ScoreBoard = require("./scoreBoard");

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var scoreBoard = new ScoreBoard();
var menuTyper = new MenuTyper()
var menu = new Menu(scoreBoard, menuTyper);

function setupPregameDisplay() {
  menu.setup();
  $("#restartButton").on("click", function(){
    gameLoop();
  });
}

function setupGameDisplay() {
  menu.prepareForGame();
  $("#restartButton").hide();
  $("#currentConversion").html("Binary:")
}

function setupPostgameDisplay(score) {
  $("#restartButton").show();
  scoreBoard.getLeaderName(score);
}

function gameLoop() {
  var game = new Game(canvas, context);
  setupGameDisplay();
  game.setup();
  requestAnimationFrame(function gamePlay() {
    if (!game.snake.isDead()) {
      game.gameLoop();
      setTimeout(function(){
        requestAnimationFrame(gamePlay);
      }, game.speed * 50);
    }
    else {
      game.render.displayGameOver();
      setupPostgameDisplay(game.score);
    }
  });
}

setupPregameDisplay();
