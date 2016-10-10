var Render = require("./render")
var Snake = require("./snake")
var UserInput = require("./userInput")

class Game {
  constructor(canvas, context) {
    this.snake = new Snake();
    this.render = new Render(canvas, context);
    this.canvas = canvas;
    this.context = context;
    this.userInput = new UserInput(this);
  }

  setup() {
    this.userInput.getUserInput();
  }

  gameLoop() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.render.drawSegment(this.snake.head);
  }

  update(input) {
    this.snake.move(input);
  }
}

module.exports = Game;
