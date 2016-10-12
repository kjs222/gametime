var Segment = require("./segment")

class Render {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
  }
  drawSegment(segment) {
    this.context.strokeRect(segment.x, segment.y, segment.width, segment.height);
  }

  drawSnake(currentSegment) {
    this.drawSegment(currentSegment);
    if (currentSegment.prev){
      this.drawSnake(currentSegment.prev);
    } else {
      return;
    }
  }
}

module.exports = Render;
