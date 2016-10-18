class ScoreBoard {
  constructor() {
    this.currentHighScores = this.getHighScores();
  }
  updateHighScores(currentScore) {
    this.currentHighScores.push(currentScore);
    var scores = this.currentHighScores;
    var sortedScores = scores.sort(function(a, b) {
      return parseInt(b) - parseInt(a);
    });
    localStorage.setItem("highScores", sortedScores.slice(0, 9))
  }


  getHighScores() {
    if (!localStorage.highScores) {
      localStorage.setItem("highScores", "0");
      return [localStorage.getItem("highScores")];
    }
    else {
      return localStorage.getItem("highScores").split(",");
    }
  }
}

module.exports = ScoreBoard;
