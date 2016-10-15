require('./style.scss');

var Game = require("./game");
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var game = new Game(canvas, context);

game.setup();

requestAnimationFrame(function test() {
  if (!game.snake.isDead()) {
    game.gameLoop();
    setTimeout(function(){
      requestAnimationFrame(test);
    }, game.speed * 50);
  }
    else {
      game.render.displayGameOver();
      game.scoreBoard.updateHighScores(game.score);
      game.render.displayScoreBoard(game.scoreBoard.getHighScores());
  }
});
