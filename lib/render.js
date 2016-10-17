var Segment = require("./segment")
var $ = require("jquery");

class Render {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
  }

  drawSegment(segment) {
    this.context.strokeRect(segment.x, segment.y, segment.width, segment.height);
    this.context.fillStyle = "#00FF00";
    this.context.font = "20pt Courier ";
  }

  drawFood(food) {
    this.context.font = "12pt Courier ";
    this.context.strokeStyle = "#55b848";
    this.context.fillStyle = "#333333";
    this.context.fillRect(food[0].x, food[0].y, food[0].width, food[0].height);
    this.context.strokeRect(food[0].x, food[0].y, food[0].width, food[0].height);
    this.context.fillStyle = "#55b848";
    this.context.fillText("0", food[0].x + 5, food[0].y + 16);

    this.context.fillStyle = "#333333";
    this.context.fillRect(food[1].x, food[1].y, food[1].width, food[1].height);
    this.context.strokeRect(food[1].x, food[1].y, food[1].width, food[1].height);
    this.context.fillStyle = "#55b848";
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
    context.font = "72px Courier";
    context.fillStyle = "00FF00";
    context.fillText("Game Over",300,250);
  }

  displayScore(score) {
    $("#currentScore").text("Score: " + score);
  }

  displayEchoCommand(currentNumber) {
    var terminal = '<span class="terminal echo">[snake]: ~$</span>'
    var command = " echo 'obase=2;"+ currentNumber.decimal + "' | bc"
    $(".status").append('<p>' + terminal + command + '</p>');
  }

  displayEchoedBinary(currentNumber) {
    $(".status").append("<p class='binary'>" + currentNumber.binary + "</p>");
  }

  displayScoreBoard(highScores) {
    $(".score").remove();
    highScores.forEach(function(score, index){
      $(".scoreboard .command").append("<p class='score'>" + index + ". Jenny: " + score + "</p>" )
    })
  }

  showInstructions(){
    $('.menu').hide();
    $('.instructions').show();
  }

  setup(highScores, currentNumber) {
    this.displayScoreBoard(highScores);
    this.showInstructions();
    this.displayEchoCommand(currentNumber);
  }
}

module.exports = Render;
