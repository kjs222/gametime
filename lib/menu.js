var MenuTyper = require("./menuTyper");
var ScoreBoard = require("./scoreBoard");
var $ = require("jquery");

class Menu {
  constructor(){
    this.scoreBoard = new ScoreBoard();
    this.menuTyper = new MenuTyper();
  }

  setup() {
    this.tabListener();
    this.scoreBoardListener();
    this.showInstructions();
    this.clearStatusMenu();
  }

  tabListener() {
    $(".tab").on('click', function(e){
        $('.tab').removeClass("active-tab");
        $(e.target).addClass("active-tab");
        $('.menu').hide();
        $('.'+$(e.target).attr('target')).show();
        if ($(e.target).attr('target') === "instructions") {
          this.menuTyper.cursorAnimation();
          this.showInstructions();
        }
        if ($(e.target).attr('target') === "scoreboard") {
          this.populateScoreboard(this.scoreBoard.currentHighScores);
        }
      }.bind(this));
  }

  scoreBoardListener() {
    $(".add-leader").hide();
    $("#leaderName").on("click", function(event) {
      $(this).html("");
    });
    $("#leaderName").on("keydown", function(event) {
      if (event.which === 13 || event.keycode === 13) {
        var leaderName = $("#leaderName").html();
        this.scoreBoard.updateHighScores(leaderName);
        $('.scoreboard .command').show();
        $(".add-leader").hide();
        $("#leaderName").html("Click to enter name.");
        this.populateScoreboard(this.scoreBoard.currentHighScores);
      }
    }.bind(this));
  }

  showInstructions(){
    $(".menu").hide();
    $(".instructions").show();
    $("#instructions-post-type").hide();
    this.menuTyper.typeStuff(" cat instructions.txt", $("#instructions-typer"), "instructions");
  }

  clearStatusMenu() {
    $(".echo").remove();
    $(".binary").remove();
  }

  prepareForGame(){
    this.clearStatusMenu();
    $("#restartButton").hide();
    $("#currentConversion").html("Binary:");
    $(".status p").remove();
    $("#status-tab").click();
  }

  populateScoreboard(highScores) {
    $(".score").remove();
    $("#scoreboard-post-type").hide();
    highScores.forEach(function(score, index){
      var scoreInfo = score.split("~");
      $("#scoreboard-post-type").append("<p class='score'>" + index + ". " + scoreInfo[0] + " : " + scoreInfo[1] + "</p>" );
    });
    this.menuTyper.typeStuff(" cat leaderboard.txt", $("#scoreboard-typer"), "scoreboard");
  }

}

module.exports = Menu;
