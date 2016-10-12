var Render = require("./render")
var Snake = require("./snake")
var UserInput = require("./userInput")
var Food = require("./food")

class Game {
  constructor(canvas, context) {
    this.snake = new Snake(this);
    this.render = new Render(canvas, context);
    this.canvas = canvas;
    this.context = context;
    this.userInput = new UserInput(this);
    this.food = null //future: need 2 - a 0 and 1
    this.speed = 2;
  }

  setup() {
    this.userInput.getUserInput();
    this.snake.food = this.replenishFood();
    this.snake.addSegment();
    this.snake.addSegment();
    this.snake.addSegment();
    this.snake.addSegment();
    this.snake.addSegment(); //this isn't for real, just for testing...
  }

  gameLoop() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.update();
    this.draw();
  }

  update() {
    this.snake.moveSnake();
  }

  draw(){
    this.render.drawSnake(this.snake.tail);
    this.render.drawFood(this.snake.food);
  }

  selectFoodCoordinates(){
    var snakeLocation = this.snake.occupiedCoordinates();
    var proposedFoodLocation = this.getRandomCoords();
    for(let i=0; i<snakeLocation.length; i++) {
      if (snakeLocation[i] === proposedFoodLocation) {
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
    var foodCoords = this.selectFoodCoordinates();
    return new Food(foodCoords.x, foodCoords.y)
    //future: give it a binary of 0 or 1
  }

  getRandomCoords(){
    var randomX = (Math.floor(Math.random() * (this.canvas.width - 10)/10) + 1) * 10;
    var randomY = (Math.floor(Math.random() * (this.canvas.height - 10)/10) + 1) *10;
    return {x: randomX, y: randomY};
  }



}

module.exports = Game;
