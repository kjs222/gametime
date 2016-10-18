require('./style.scss');

var Game = require("./game");
var ScoreBoard = require("./scoreBoard");
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var scoreBoard = new ScoreBoard();

function displayScoreBoard(highScores) {
  $(".score").remove();
  highScores.forEach(function(score, index){
    $(".scoreboard .command").append("<p class='score'>" + index + ". Jenny: " + score + "</p>" )
  })
}

function clearStatusMenu() {
  $(".echo").remove();
  $(".binary").remove();
}

$(".menu").hide();
$(".instructions").show();
displayScoreBoard(scoreBoard.getHighScores());




function gameLoop() {
  $("#restartButton").hide();
  var game = new Game(canvas, context);
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
      scoreBoard.updateHighScores(game.score);
      displayScoreBoard(scoreBoard.getHighScores());
      $("#restartButton").show();
    }
  });
}

$("#restartButton").on("click", function(){
  clearStatusMenu();
  gameLoop();
});


$(".tab").on('click', function(){
    $('.tab').removeClass("active-tab")
    $(this).addClass("active-tab")
    $('.menu').hide();
    $('.'+$(this).attr('target')).show();
    // if ($(this).attr('target') == "scoreboard") {
    //   scoreboard.
    // }
} );
