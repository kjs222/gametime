var Render = require("./render")
var Snake = require("./snake")
var UserInput = require("./userInput")
var Food = require("./food")
var Num = require("./num")

class Game {
  constructor(canvas, context) {
    this.snake = new Snake(this);
    this.render = new Render(canvas, context);
    this.canvas = canvas;
    this.context = context;
    this.userInput = new UserInput(this);
    this.food = { 0: null , 1: null}
    this.speed = 2;
    this.currentNumber = new Num(10);
  }

  setup() {
    this.userInput.getUserInput();
    this.replenishFood();
    this.displayNumber();
    console.log(this.currentNumber.decimal, this.currentNumber.binary);
    console.log("to eat: ", this.currentNumber.nextBit())
  }

  gameLoop() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.update();
    this.draw();
  }

  update() {
    this.updateSnake();
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
    // if(proposedFoodLocation.x === this.snake.head.x || proposedFoodLocation.y === this.snake.head.y) {
    //   return this.selectFoodCoordinates();
    // }
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

  snakeAteZero(){
    return (this.snake.head.x === this.food[0].x && this.snake.head.y === this.food[0].y)
  }

  snakeAteOne(){
    return (this.snake.head.x === this.food[1].x && this.snake.head.y === this.food[1].y)
  }

  snakeAteCorrectFood(num){
    return num.toString() === this.currentNumber.nextBit();
  }

  snakeAteFood(){
    if (this.snakeAteZero()) {
      this.food[0] = null;
      if(this.snakeAteCorrectFood(0)) {
        this.snake.addSegment();
        console.log("correct food")
      } else {
        console.log("incorrect food")
      }
    }
    else if (this.snakeAteOne()) {
      this.food[1] = null;
      if(this.snakeAteCorrectFood(1)) {
        this.snake.addSegment();
        console.log("correct food")
      } else {
        console.log("incorrect food")
      }
    }
  }

  updateSnake(){
    this.snake.moveSnake();
    this.snakeAteFood();
    this.replenishFood();
  }

  getRandomCoords(){
    var randomX = (Math.floor(Math.random() * (this.canvas.width - 20)/20) + 1) * 20;
    var randomY = (Math.floor(Math.random() * (this.canvas.height - 20)/20) + 1) * 20;
    return {x: randomX, y: randomY};
  }

  displayNumber() {
    // $$$
    this.currentNumber;
  }
}

module.exports = Game;
