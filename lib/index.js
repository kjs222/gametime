require('./style.scss');

var Game = require("./game");
var ScoreBoard = require("./scoreBoard");
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var scoreBoard = new ScoreBoard();

function populateScoreBoard(highScores) {
  $(".score").remove();
  highScores.forEach(function(score, index){
    $(".scoreboard .command").append("<p class='score'>" + index + ". Jenny: " + score + "</p>" )
  })
}

function clearStatusMenu() {
  $(".echo").remove();
  $(".binary").remove();
}

function showInstructions(){
  $(".menu").hide();
  $(".instructions").show();//fix this so not all shows
  typeStuff(" cat instructions.txt", $("#instructions-typer"));
}

function setupPregameDisplay() {
  clearStatusMenu();
  showInstructions();
  populateScoreBoard(scoreBoard.getHighScores());
  $("#restartButton").on("click", function(){
    gameLoop();
  });
}

function setupGameDisplay() {
  clearStatusMenu();
  populateScoreBoard(scoreBoard.getHighScores());
  $("#restartButton").hide();
  $(".status p").remove();
  $("#status-tab").click();
}

function setupPostgameDisplay(score) {
  scoreBoard.updateHighScores(score);
  populateScoreBoard(scoreBoard.getHighScores());
  $("#restartButton").show();
  $("#scoreboard-tab").click();
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

$(".tab").on('click', function(){
    $('.tab').removeClass("active-tab")
    $(this).addClass("active-tab")
    $('.menu').hide();
    $('.'+$(this).attr('target')).show(); //maybe add this in an else
    if ($(this).attr('target') === "instructions") {
      typeStuff(" cat instructions.txt", $("#instructions-typer"));
      //add something where the rest of the stuff is hidden until this completes
    }
    if ($(this).attr('target') === "scoreboard") {
      typeStuff(" cat leaderboard.txt", $("#scoreboard-typer"));
      //add something where the rest of the stuff is hidden until this completes

    }
} );



function typeStuff(text, container) {
  var textLength = 0;
  function typer() {
      container.html(text.substr(0, textLength++));
      if(textLength < text.length+1) {
          setTimeout(typer , 50);
      } else {
          textLength = 0;
          text = '';
      }
  }
  typer();
}
