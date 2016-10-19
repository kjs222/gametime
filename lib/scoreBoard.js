var MenuTyper = require("./menuTyper");
var menuTyper = new MenuTyper()

class ScoreBoard {
  constructor() {
    this.currentHighScores = this.getHighScores();
  }

  updateHighScores(score, leaderName) {
      this.currentHighScores.push(leaderName + "~" + score);
      var scores = this.currentHighScores.map(function(score) {
        return score.split("~");
      })

      var topScores = scores.sort(function(a, b) {
        return parseInt(b[1]) - parseInt(a[1]);
      }).slice(0, 9);

      topScores = topScores.map(function(score){
        return score.join("~");
      })

      localStorage.setItem("highScores", topScores);
      $("#scoreboard-tab").click();
      this.populate();
  }

  getLeaderName(score){
    if (score > this.lowestScore() || this.roomAvailable()) {
      $(".score").remove();
      this.topScoreClick();
      $(".add-leader").show();

      $("#leaderName").on("keydown", function(event) {
        if (event.which == 13 || event.keycode == 13) {
          var leaderName = $("#leaderName").html();
          this.updateHighScores(score, leaderName);
          $(".add-leader").hide();
          $("#leaderName").html("Enter Name Here.")
        }
      }.bind(this))
      return true
    } else {
      return false
    }
  }

  topScoreClick() {
        $('.tab').removeClass("active-tab");
        $('#scoreboard-tab').addClass("active-tab");
        $('.menu').hide();
        $('.scoreboard').show();
  }

  getHighScores() {
    if (!localStorage.highScores) {
      localStorage.setItem("highScores", "Snake~0");
      return [localStorage.getItem("highScores")];
    }
    else {
      return localStorage.getItem("highScores").split(",");
    }
  }

  numHighScores() {
    return this.currentHighScores.length
  }

  roomAvailable() {
    return this.numHighScores() < 10
  }

  lowestScore() {
    return this.currentHighScores[this.numHighScores() - 1].split("~")[1];
  }

  populate() {
    $(".score").remove();
    $("#scoreboard-post-type").hide();
    this.currentHighScores.forEach(function(score, index){
      var scoreInfo = score.split("~")
      $("#scoreboard-post-type").append("<p class='score'>" + index + ". " + scoreInfo[0] + " : " + scoreInfo[1] + "</p>" )
    })
    menuTyper.typeStuff(" cat leaderboard.txt", $("#scoreboard-typer"), "scoreboard");
  }
}

module.exports = ScoreBoard;
