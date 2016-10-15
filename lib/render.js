var Segment = require("./segment")
var $ = require("jquery");

class Render {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
  }

  drawSegment(segment) {
    this.context.strokeRect(segment.x, segment.y, segment.width, segment.height);
  }

  drawFood(food) {
    this.context.font = "12pt Arial";
    this.context.strokeStyle = "#000";
    this.context.fillStyle = "black";
    this.context.fillRect(food[0].x, food[0].y, food[0].width, food[0].height);
    this.context.strokeRect(food[0].x, food[0].y, food[0].width, food[0].height);
    this.context.fillStyle = "white";
    this.context.fillText("0", food[0].x + 5, food[0].y + 16);

    this.context.fillStyle = "black";
    this.context.fillRect(food[1].x, food[1].y, food[1].width, food[1].height);
    this.context.strokeRect(food[1].x, food[1].y, food[1].width, food[1].height);
    this.context.fillStyle = "white";
    this.context.fillText("1", food[1].x + 5, food[1].y + 16);
  }

  drawSnake(currentSegment) {
    this.drawSegment(currentSegment);
    if (currentSegment.prev){
      this.drawSnake(currentSegment.prev);
    } else {
      return;
    }
  }

  clearConversion() {
    $("#currentConversion").text("Binary: ");
  }

  updateCurrentConversion(foodEaten) {
    var currentText = $("#currentConversion").text();
    $("#currentConversion").text(currentText + foodEaten);
  }

  displayNumber(currentNumber) {
    $("#currentNumber").text(currentNumber.decimal);
  }

  displayGameOver(){
    var context = this.context;
    context.font = "72px monaco";
    context.fillStyle = "red"
    context.fillText("Game Over",300,250);
  }

  displayScore(score) {
    $("#currentScore").text("Score: " + score);
  }

  displayScoreBoard(highScores) {
    $("#scoreBoard").text(highScores);
  }
}

module.exports = Render;
