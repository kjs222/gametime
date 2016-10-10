var Game = require("./game")

var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d');

// var render = new Render(canvas, context)
// var snake =
// render.drawSegment(snake.head)
//
// var userInput = new UserInput()
// userInput.sendUserInput();

var game = new Game(canvas, context)

requestAnimationFrame(function test() {
  game.gameLoop()
  this.snake.move(this.userInput.sendUserInput())
  requestAnimationFrame(test);
})
