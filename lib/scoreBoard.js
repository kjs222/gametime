var $ = require("jquery");

class ScoreBoard {
  constructor() {
    this.currentHighScores = this.getHighScores();
    this.newScore = null;
  }

  updateHighScores(leaderName) {
      this.currentHighScores.push(leaderName + "~" + this.newScore);
      var scores = this.currentHighScores.map(function(score) {
        return score.split("~");
      });

      var topScores = scores.sort(function(a, b) {
        return parseInt(b[1]) - parseInt(a[1]);
      }).slice(0, 10);

      this.currentHighScores = topScores.map(function(score){
        return score.join("~");
      });

      localStorage.setItem("highScores", this.currentHighScores);
  }

  getLeaderName(score){
    this.newScore = score;
    if (score > this.lowestScore() || this.roomAvailable()) {
      $(".score").remove();
      this.topScoreClick();
      $(".add-leader").show();
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
    return this.currentHighScores.length;
  }

  roomAvailable() {
    return this.numHighScores() < 10;
  }

  lowestScore() {
    return this.currentHighScores[this.numHighScores() - 1].split("~")[1];
  }

}

module.exports = ScoreBoard;
