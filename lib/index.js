require('./style.scss');

var Game = require("./game");
var MenuTyper = require("./menuTyper");
var ScoreBoard = require("./scoreBoard");
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var scoreBoard = new ScoreBoard();
var menuTyper = new MenuTyper()


function clearStatusMenu() {
  $(".echo").remove();
  $(".binary").remove();
}

function showInstructions(){
  $(".menu").hide();
  $(".instructions").show();
  $("#instructions-post-type").hide();
  menuTyper.typeStuff(" cat instructions.txt", $("#instructions-typer"), "instructions");
}

function setupPregameDisplay() {
  clearStatusMenu();
  showInstructions();
  $(".add-leader").hide();
  $("#restartButton").on("click", function(){
    gameLoop();
  });
}

function setupGameDisplay() {
  clearStatusMenu();
  $("#restartButton").hide();
  $(".status p").remove();
  $("#status-tab").click();
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

$(".tab").on('click', function(){
    $('.tab').removeClass("active-tab");
    $(this).addClass("active-tab");
    $('.menu').hide();
    $('.'+$(this).attr('target')).show();
    if ($(this).attr('target') === "instructions") {
      showInstructions();
    }
    if ($(this).attr('target') === "scoreboard") {
      scoreBoard.populate();
    }
} );

$("#leaderName").on("keydown", function(event) {
  if (event.which == 13 || event.keycode == 13) {
    var leaderName = $("#leaderName").html();
    scoreBoard.updateHighScores(leaderName);
    $(".add-leader").hide();
    $("#leaderName").html("Enter Name Here.")
  }
});
