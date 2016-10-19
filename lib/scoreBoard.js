var MenuTyper = require("./menuTyper");
var menuTyper = new MenuTyper()

class ScoreBoard {
  constructor() {
    this.currentHighScores = this.getHighScores();
    this.newScore = null;
  }

  updateHighScores(leaderName) {
      this.currentHighScores.push(leaderName + "~" + this.newScore);
      var scores = this.currentHighScores.map(function(score) {
        return score.split("~");
      })

      var topScores = scores.sort(function(a, b) {
        return parseInt(b[1]) - parseInt(a[1]);
      }).slice(0, 10);

      this.currentHighScores = topScores.map(function(score){
        return score.join("~");
      })

      localStorage.setItem("highScores", this.currentHighScores);

      this.populate();
  }

  getLeaderName(score){
    this.newScore = score;
    if (score > this.lowestScore() || this.roomAvailable()) {
      $(".score").remove();
      this.topScoreClick();
      $(".add-leader").show();
      // this.genAddLeaderHTML();
      // $("#leaderName").on("keydown", function(event) {
      //   if (event.which == 13 || event.keycode == 13) {
      //     var leaderName = $("#leaderName").html();
      //     this.updateHighScores(score, leaderName);
      //     $(".add-leader").hide();
      //     $("#leaderName").html("Enter Name Here.")
      //   }
      // }.bind(this))

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

  // genAddLeaderHTML() {
  //   var msg = '<p>Congratulations! Add your name to the leaderboard</p>'
  //   var input = '<p class="prompt temp"><span class="terminal">[snake]: ~$</span> <span id="leaderName" contenteditable="true">Enter Name Here.</span><span class="cursor">|</span></p>'
  //   $(".add-leader").append(msg);
  //   $(".add-leader").append(input);
  //
  // }
}

module.exports = ScoreBoard;
