class ScoreBoard {
  constructor() {
    this.currentHighScores = this.getHighScores();
  }
  updateHighScores(currentScore, leaderName) {
    this.currentHighScores.push(currentScore + " " + leaderName);
    var scores = this.currentHighScores;
    console.log(scores, leaderName)
    // var sortedScores = scores.sort(function(a, b) {
    //   return parseInt(b) - parseInt(a);
    // });
    localStorage.setItem("highScores", scores)
    //, sortedScores.slice(0, 9));
  }


  getHighScores() {
    if (!localStorage.highScores) {
      localStorage.setItem("highScores", "Jenny 0");
      return [localStorage.getItem("highScores")];
    }
    else {
      return localStorage.getItem("highScores").split(",");
    }
  }

  // lowestScore() {
  //   var highScores = getHighScores();
  //   return highScores[length - 1];
  // }
}

module.exports = ScoreBoard;
