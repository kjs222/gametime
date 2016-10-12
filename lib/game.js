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
}

module.exports = Game;
