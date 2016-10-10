var Segment = require("./segment")

class Snake {
  constructor() {
    this.head = new Segment(50, 50);
  }
  move(keyCode) {
    switch(keyCode) {
      case 'left':
        this.head.x = this.head.x - this.head.width;
        break;
      case 'up':
      this.head.y = this.head.y - this.head.height;
        break;
      case 'right':
        this.head.x = this.head.x + this.head.width;
        break;
      case 'down':
      this.head.y = this.head.y + this.head.height;
        break;
    }
  }
}

module.exports = Snake;
