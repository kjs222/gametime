var Render = require("./render")
var Snake = require("./snake")
var UserInput = require("./userInput")
var Food = require("./food")
var Num = require("./num")
var scoreBoard = require("./scoreBoard")
var $ = require("jquery");

class Game {
  constructor(canvas, context) {
    this.snake = new Snake(this);
    this.render = new Render(canvas, context);
    this.canvas = canvas;
    this.context = context;
    this.userInput = new UserInput(this);
    this.food = { 0: null , 1: null}
    this.speed = 2;
    this.currentNumber = new Num(1);
    this.score = 0;
    this.scoreBoard = new scoreBoard();
  }

  setup() {
    this.userInput.getUserInput();
    this.replenishFood();
    this.displayNumber();
    this.render.setup(this.scoreBoard.getHighScores(), this.currentNumber);
    
    this.snake.startLength();
    console.log(this.currentNumber.decimal, this.currentNumber.binary);
    console.log("to eat: ", this.currentNumber.nextBit())
  }

  gameLoop() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.update();
    this.draw();
    this.displayNumber();
  }

  update() {
    this.updateSnake();
    this.handleSolvedNumber();
    this.displayScore();
    console.log("to eat: ", this.currentNumber.nextBit());
  }

  draw(){
    this.render.drawSnake(this.snake.tail);
    this.render.drawFood(this.food);
  }

  selectFoodCoordinates(){
    var snakeLocation = this.snake.occupiedCoordinates();
    var proposedFoodLocation = this.getRandomCoords();
    for(var i=0; i<snakeLocation.length; i++) {
      if (snakeLocation[i].x == proposedFoodLocation.x && snakeLocation[i].y == proposedFoodLocation.y) {
        return this.selectFoodCoordinates();
      }
    }
    return proposedFoodLocation;
    //NEED TO ADD: check againt current food location
  }

  replenishFood(){
    if(this.food[0] === null) {
      var foodCoords = this.determineFoodLocation(1);
      var food = new Food(foodCoords.x, foodCoords.y, 0)
      this.food[0] = food;
    }
     if (this.food[1] === null) {
      var foodCoords = this.determineFoodLocation(0);
      var food = new Food(foodCoords.x, foodCoords.y, 1)
      this.food[1] = food;
    }
  }

  determineFoodLocation(number) {
    var proposedFoodCoords = this.selectFoodCoordinates();
    if ( this.food[number] && proposedFoodCoords.x === this.food[number].x && proposedFoodCoords.y === this.food[number].y) {
      proposedFoodCoords = this.selectFoodCoordinates();
    }
    return proposedFoodCoords;
  }

  snakeAteCorrectFood(foodBitEaten){
    return this.currentNumber.nextBit() === foodBitEaten.toString();
  }

  snakeAteFood(){
    var foodEaten = this.snake.ateFood(this.food);
    if (this.snakeAteCorrectFood(foodEaten)) {
      this.food[foodEaten] = null;
      this.render.updateCurrentConversion(foodEaten);
      this.currentNumber.updateBitsToEat();
      this.snake.addSegment();
      console.log("correct food");
    } else if (foodEaten !== false) {
      console.log("incorrect food");
      this.food[foodEaten] = null;
      this.snake.loseTwoSegment();
    }
  }

  updateSnake(){
    this.snake.moveSnake();
    this.snakeAteFood();
    this.replenishFood();
  }

  handleSolvedNumber(){
    if (this.currentNumber.isSolved()) {
      this.render.displayEchoedBinary(this.currentNumber);
      this.currentNumber = new Num(this.currentNumber.decimal + 1);
      console.log(this.currentNumber.decimal, this.currentNumber.binary);
      this.render.displayEchoCommand(this.currentNumber);
      this.render.clearConversion();
      this.updateScore();
    }
  }

  updateScore() {
    this.score++
  }

  getRandomCoords(){
    var randomX = (Math.floor(Math.random() * (this.canvas.width - 20)/20) + 1) * 20;
    var randomY = (Math.floor(Math.random() * (this.canvas.height - 20)/20) + 1) * 20;
    return {x: randomX, y: randomY};
  }

  displayNumber() {
    this.render.displayNumber(this.currentNumber);
  }

  displayScore() {
    this.render.displayScore(this.score);
  }
}

module.exports = Game;
