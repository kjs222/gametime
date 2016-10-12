var Segment = require("./segment")

class Snake {
  constructor(game) {
    this.game = game;
    this.head = new Segment(50, 50);
    this.tail = this.head;
    this.speed = 2;
    this.direction = null;
  }

  setDirection(input) {
    this.direction = input;
  }

  moveHead() {
    if (this.head.x < 300 && this.head.x > 0 && this.head.y < 300 && this.head.y > 0) {
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
  else {
    var context = this.game.context;
    context.font = "30px Arial";
    context.fillText("Game Over",10,50);
  }
}

  addSegment(){
    var oldTail = this.tail
    switch(this.direction) {
      case 'left':
        var newTail = new Segment(this.tail.x + this.speed, this.tail.y)
        this.tail = newTail;
        this.tail.prev = oldTail;
        break;
      case 'up':
        var newTail = new Segment(this.tail.x, this.tail.y + this.speed)
        this.tail = newTail;
        this.tail.prev = oldTail;
        break;
      case 'right':
        var newTail = new Segment(this.tail.x + this.speed, this.tail.y)
        this.tail = newTail;
        this.tail.prev = oldTail;
        break;
      case 'down':
        var newTail = new Segment(this.tail.x, this.tail.y - this.speed)
        this.tail = newTail;
        this.tail.prev = oldTail;
        break;
      default:
        var newTail = new Segment(this.tail.x + this.speed, this.tail.y)
        this.tail = newTail;
        this.tail.prev = oldTail;
        return;
    }
  }

  moveSnake(currentSegment=this.tail){
    if(this.direction) {
      if(currentSegment.prev === null) {
        this.moveHead();
        return;
      } else {
        currentSegment.x = currentSegment.prev.x;
        currentSegment.y = currentSegment.prev.y;
        return this.moveSnake(currentSegment.prev)
      }
    }
  }
}

module.exports = Snake;
