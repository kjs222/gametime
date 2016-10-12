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
    this.food = []//{0:{}, 1:{new Food()}}
    this.speed = 2;
  }

  setup() {
    this.userInput.getUserInput();
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

    //assign to this.food 1 or 0
    // this.render.drawFood(newFood)

  }

  getRandomCoords(){
    var randomX = (Math.floor(Math.random() * this.canvas.width/10) + 1) * 10;
    var randomY = (Math.floor(Math.random() * this.canvas.height/10) + 1) *10;
    return {x: randomX, y: randomY};
  }



}

module.exports = Game;
