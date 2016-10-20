var Render = require("./render");
var Snake = require("./snake");
var UserInput = require("./userInput");
var Food = require("./food");
var Num = require("./num");

class Game {
  constructor(canvas, context) {
    this.snake = new Snake(this);
    this.render = new Render(canvas, context);
    this.canvas = canvas;
    this.context = context;
    this.userInput = new UserInput(this);
    this.food = { 0: null , 1: null};
    this.currentNumber = new Num(1);
    this.score = 0;
    this.speed = 2;
  }

  setup() {
    this.userInput.getUserInput();
    this.replenishFood();
    this.displayNumber();
    this.render.displayEchoCommand(this.currentNumber);
    this.snake.startLength();
  }

  gameLoop() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.update();
    this.draw();
  }

  update() {
    this.updateSnake();
    this.handleSolvedNumber();
    this.displayScore();
    this.displayNumber();
  }

  draw(){
    this.render.draw(this.snake.tail, this.food);
  }

  selectFoodCoordinates(){
    var snakeLocation = this.snake.occupiedCoordinates();
    var proposedFoodLocation = this.getRandomCoords();
    for(var i=0; i<snakeLocation.length; i++) {
      if (snakeLocation[i].x === proposedFoodLocation.x && snakeLocation[i].y === proposedFoodLocation.y) {
        return this.selectFoodCoordinates();
      }
    }
    return proposedFoodLocation;
  }


  generateNewFoodItem(bitType) {
    var otherBit = bitType === 0 ? 1 : 0;
    var foodCoords = this.determineFoodLocation(otherBit);
    var food = new Food(foodCoords.x, foodCoords.y, bitType);
    this.food[bitType] = food;
  }

  replenishFood(){
    if (this.food[0] === null) { this.generateNewFoodItem(0);}
    if (this.food[1] === null) {this.generateNewFoodItem(1);}
  }

  determineFoodLocation(otherBit) {
    var proposedFoodCoords = this.selectFoodCoordinates();
    if ( this.food[otherBit] && proposedFoodCoords.x === this.food[otherBit].x && proposedFoodCoords.y === this.food[otherBit].y) {
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
      this.updateScore();
    } else if (foodEaten !== false) {
      this.food[foodEaten] = null;
      this.snake.loseTwoSegment();
    }
  }

  updateSnake(){
    this.snakeAteFood();
    this.snake.moveSnake();
    this.replenishFood();
  }

  handleSolvedNumber(){
    if (this.currentNumber.isSolved()) {
      this.render.displayEchoedBinary(this.currentNumber);
      this.updateScore(this.currentNumber.decimal);
      this.currentNumber = new Num(this.currentNumber.decimal + 1);
      this.render.displayEchoCommand(this.currentNumber);
      this.render.clearConversion();
      this.snake.tail.solvedNumber = true;
    }
  }

  updateScore(num) {
    if (num) {
      this.score += num;
    } else {
      this.score++;
    }
  }

  inProgress() {
    return !this.snake.isDead();
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
