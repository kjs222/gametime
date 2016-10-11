var Segment = require("./segment")

class Snake {
  constructor(game) {
    this.game = game;
    this.head = new Segment(50, 50);
    this.tail = this.head//this.head;
    this.speed = 2;
    this.direction = null;
  }

  setDirection(input) {
    this.direction = input;
  }

  moveHead() {
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

}

module.exports = Snake;
