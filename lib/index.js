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
      updateHighScores(getHighScores(), game.score);
  }
});

function updateHighScores(scores, currentScore) {
    scores.push(currentScore);
    var sortedScores = scores.sort(function(a, b) {
      return parseInt(b) - parseInt(a);
    });
    localStorage.setItem("highScores", sortedScores.slice(0, 9))
    console.log(localStorage.highScores)
  }


function getHighScores() {
  if (!localStorage.highScores) {
    localStorage.setItem("highScores", "0");
    return [localStorage.getItem("highScores")];
  }
  else {
    return localStorage.getItem("highScores").split(",");
  }
}
