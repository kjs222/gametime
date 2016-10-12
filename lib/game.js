var Render = require("./render")
var Snake = require("./snake")
var UserInput = require("./userInput")

class Game {
  constructor(canvas, context) {
    this.snake = new Snake(this);
    this.render = new Render(canvas, context);
    this.canvas = canvas;
    this.context = context;
    this.userInput = new UserInput(this);
    this.food = null//{0:{}, 1:{new Food()}}
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
    //randomly picks x y (factors of 10 - i.e. seg height/widht)
    //checks those against snake.coords - if ni snake coords, pick against
    //check againt current food
    //do not put in same x or y plane as snake head
    //

  }
  replenishFood(){

    // var newCoords = selectFoodCoordinates();
    // var newFood = new Food()// takes in newCoords
    //assign to this.food 1 or 0
    // this.render.drawFood(newFood)

  }



}

module.exports = Game;
