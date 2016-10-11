var Segment = require("./segment")

class Snake {
  constructor(game) {
    this.game = game;
    this.head = new Segment(50, 50);
    this.speed = 1;
    this.direction = null;
  }

  setDirection(input) {
    this.direction = input;
  }

  move() {
    switch(this.direction) {
      case 'left':
        this.head.x = this.head.x - this.speed;
        break;
      case 'up':
        this.head.y = this.head.y - this.speed;
        break;
      case 'right':
        this.head.x = this.head.x + this.speed;
        break;
      case 'down':
        this.head.y = this.head.y + this.speed;
        break;
      default:
        return; //this is stopping the thing....
    }
  }

}

module.exports = Snake;
