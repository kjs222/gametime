keyCodeMapper = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down'
}

var Segment = require("./segment")
var Render = require("./render")
var Snake = require("./snake")

var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d');

var render = new Render(canvas, context)
var snake = new Snake()
render.drawSegment(snake.head)

window.addEventListener("keydown", function(event){
   snake.move(keyCodeMapper[event.keyCode]);
   render.drawSegment(snake.head)
 });
