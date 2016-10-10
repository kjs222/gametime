var Segment = require("./segment")

class Render {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
  }
  drawSegment(segment) {
    this.context.fillRect(segment.x, segment.y, segment.width, segment.height);
  }
}

module.exports = Render;
