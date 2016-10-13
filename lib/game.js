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
    this.replenishFood();
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
    if(!this.food || this.snakeAteFood()) {
      var foodCoords = this.selectFoodCoordinates();
      var food = new Food(foodCoords.x, foodCoords.y)//future will have a binary as well
      this.food = food;//in future this.food will be an obj probs
      return food;
    }
  }

  snakeAteFood(){
    return this.food.x === this.snake.head.x && this.food.y === this.snake.head.y
  }

  updateSnake(){
    this.snake.moveSnake();
    if (this.snakeAteFood()){this.snake.addSegment();}
    this.replenishFood();
  }

  getRandomCoords(){
    var randomX = (Math.floor(Math.random() * (this.canvas.width - 10)/10) + 1) * 10;
    var randomY = (Math.floor(Math.random() * (this.canvas.height - 10)/10) + 1) *10;
    return {x: randomX, y: randomY};
  }
}

module.exports = Game;
