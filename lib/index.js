require('./style.scss');

var Game = require("./game");
var ScoreBoard = require("./scoreBoard");
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var scoreBoard = new ScoreBoard();

function populateScoreBoard(highScores) {
  $(".score").remove();
  $("#scoreboard-post-type").hide();
  highScores.forEach(function(score, index){
    $("#scoreboard-post-type").append("<p class='score'>" + index + "." + name + " : " + score[1] + "</p>" )
  })
  typeStuff(" cat leaderboard.txt", $("#scoreboard-typer"), "scoreboard");
}

function clearStatusMenu() {
  $(".echo").remove();
  $(".binary").remove();
}

function showInstructions(){
  $(".menu").hide();
  $(".instructions").show();
  $("#instructions-post-type").hide();
  typeStuff(" cat instructions.txt", $("#instructions-typer"), "instructions");
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
  $("#currentConversion").html("Binary:")
}

function setupPostgameDisplay(score) {
  $("#restartButton").show();
  $("#scoreboard-tab").click();
  var leaderName = getLeaderName();
  console.log(leaderName)
  scoreBoard.updateHighScores(score, leaderName);
  populateScoreBoard(scoreBoard.getHighScores());

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
    $('.tab').removeClass("active-tab");
    $(this).addClass("active-tab");
    $('.menu').hide();
    $('.'+$(this).attr('target')).show();
    if ($(this).attr('target') === "instructions") {
      showInstructions();
    }
    if ($(this).attr('target') === "scoreboard") {
      populateScoreBoard(scoreBoard.getHighScores());
    }
} );

function cursorAnimation() {
    $('.new-cursor').animate({
        opacity: 0
    }, 'slow', 'swing').animate({
        opacity: 1
    }, 'slow ', 'swing');
}


function typeStuff(text, container, menuName) {
  // $(".new-cursor").show();
  setInterval (cursorAnimation, 800);
  var textLength = 0;
  function typer() {
      container.html(text.substr(0, textLength++));
      if(textLength < text.length+1) {
          setTimeout(typer , 80);
      } else {
          $("#" + menuName + "-post-type").fadeIn(700);
          $(".new-cursor").hide();
          textLength = 0;
          text = '';
      }
  }
  typer();
}

function getLeaderName(){
  $("#leaderName").on("keydown", function(event) {
    if (event.which == 13 || event.keycode == 13) {
      var leaderName = $("#leaderName").html();
      return leaderName;
    }
  })
}

getLeaderName();
