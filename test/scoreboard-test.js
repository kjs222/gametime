const chai = require('chai');
const assert = chai.assert;
const ScoreBoard = require('../lib/scoreBoard');

describe("ScoreBoard", function(){

  context("with default attributes", function(){

    it('should be instantiated', function(){
      let scoreBoard = new ScoreBoard();
      assert.isObject(scoreBoard);
    });

    it('should have newScore property', function(){
      let scoreBoard = new ScoreBoard();
      assert.isNull(scoreBoard.newScore);
    });
  });

  context("with calculatedAttribute", function(){

    it('should have currentHighScores property', function(){
      let scoreBoard = new ScoreBoard();
      assert.isNotNull(scoreBoard.currentHighScores);
    });
  });
});

describe("lowestScore()", function(){

  it('should return lowest high score', function(){
    let scoreBoard = new ScoreBoard();
    scoreBoard.currentHighScores = ["Kerry~2", "Kerry~7", "Kerry~1"];
    assert.equal(scoreBoard.lowestScore(), 1);
  });
});

describe("roomAvailable()", function(){

  it('should return true if less than 10 high scores', function(){
    let scoreBoard = new ScoreBoard();
    scoreBoard.currentHighScores = ["Kerry~2", "Kerry~1", "Kerry~8"];
    assert(scoreBoard.roomAvailable());
  });

  it('should returns false if 10 high scores', function(){
    let scoreBoard = new ScoreBoard();
    scoreBoard.currentHighScores = ["Kerry~2", "Kerry~1", "Kerry~8", "Kerry~2", "Kerry~1", "Kerry~8", "Kerry~2", "Kerry~1", "Kerry~8", "Kerry~8"];
    assert.equal(scoreBoard.roomAvailable(), false);
  });
});

describe("numHighScores()", function(){

  it('should return number of high scores', function(){
    let scoreBoard = new ScoreBoard();
    scoreBoard.currentHighScores = ["Kerry~2", "Kerry~1", "Kerry~8"];
    assert.equal(scoreBoard.numHighScores(), 3);
  });
});


describe("updateHighScores()", function(){

  it('should add a new high score', function(){
    let scoreBoard = new ScoreBoard();
    scoreBoard.currentHighScores = ["Kerry~2", "Kerry~1", "Kerry~8"];
    scoreBoard.newScore = 9;
    scoreBoard.updateHighScores("Jenny");
    assert.equal(scoreBoard.numHighScores(), 4);
  });

  it('should order high scores in desc order', function(){
    let scoreBoard = new ScoreBoard();
    scoreBoard.currentHighScores = ["Kerry~2", "Kerry~1", "Kerry~8"];
    scoreBoard.newScore = 9;
    scoreBoard.updateHighScores("Jenny");
    assert.equal(scoreBoard.currentHighScores[0], "Jenny~9");
    assert.equal(scoreBoard.currentHighScores[1], "Kerry~8");
  });

  it('should only keep 10 high scores', function(){
    let scoreBoard = new ScoreBoard();
    scoreBoard.currentHighScores = ["Kerry~2", "Kerry~1", "Kerry~8", "Kerry~2", "Kerry~1", "Kerry~8", "Kerry~2", "Kerry~1", "Kerry~8", "Kerry~8"];
    scoreBoard.newScore = 9;
    scoreBoard.updateHighScores("Jenny");
    assert.equal(scoreBoard.currentHighScores.length, 10);
  });
});
