var Render = require("./render")
var Snake = require("./snake")
var UserInput = require("./userInput")


class Game {
  constructor(canvas, context) {
    this.snake = new Snake();
    this.render = new Render(canvas, context);
    this.canvas = canvas;
    this.context = context;
    this.userInput = new UserInput();
  }

  gameLoop() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.render.drawSegment(this.snake.head);
    // this.snake.move(this.userInput.sendUserInput())
  }
}

module.exports = Game;
