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
  }
  
  getLeaderName(score){
    if (score > this.lowestScore() || this.roomAvailable()) {
      $("#leaderName").on("keydown", function(event) {
        if (event.which == 13 || event.keycode == 13) {
          var leaderName = $("#leaderName").html();
          this.updateHighScores(score, leaderName);
        }
      }.bind(this))
    }
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
}

module.exports = ScoreBoard;
