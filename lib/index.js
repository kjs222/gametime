require('./style.scss');

var $ = require("jquery");
var Game = require("./game");
var Menu = require("./menu");
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var menu = new Menu();

function setupPregameDisplay() {
  menu.setup();
  $("#start-buttons").on("click", function(e){
    var level = e.target.getAttribute('target');
    gameLoop(level);
  });
}

function setupGameDisplay() {
  menu.prepareForGame();
}

function setupPostgameDisplay(score) {
  $("#start-buttons").show();
  menu.scoreBoard.getLeaderName(score);
}

function gameLoop(level) {
  var game = new Game(canvas, context, level);
  setupGameDisplay();
  game.setup();
  requestAnimationFrame(function gamePlay() {
    if (game.inProgress()) {
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

window.addEventListener("keydown", function(e) {
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
