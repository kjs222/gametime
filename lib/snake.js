var Segment = require("./segment")

class Snake {
  constructor(game) {
    this.game = game;
    this.head = new Segment(120, 100);
    this.tail = this.head;
    this.direction = null;
  }

  setDirection(input, previousDirection) {
    this.direction = input;
    if (this.attemptedReverseDirection(previousDirection)) {
      this.direction = previousDirection
    }
  }

  moveHead() {
    switch(this.direction) {
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
      default:
      return; //this is pausing the game.
    }
  }

attemptedReverseDirection(previousDirection) {
  return ((previousDirection == "right" && this.direction == "left") ||
  (previousDirection == "left" && this.direction == "right") ||
  (previousDirection == "up" && this.direction == "down") ||
  (previousDirection == "down" && this.direction == "up"))
}

addSegment(){
   var oldTail = this.tail
   switch(this.direction) {
     case 'left':
       var newTail = new Segment(this.tail.x + this.tail.width, this.tail.y)
       this.tail = newTail;
       this.tail.prev = oldTail;
       break;
     case 'up':
       var newTail = new Segment(this.tail.x, this.tail.height + this.tail.y)
       this.tail = newTail;
       this.tail.prev = oldTail;
       break;
     case 'right':
       var newTail = new Segment(this.tail.x - this.tail.width, this.tail.y)//this one was wrong
       this.tail = newTail;
       this.tail.prev = oldTail;
       break;
     case 'down':
       var newTail = new Segment(this.tail.x, this.tail.y - this.tail.height)
       this.tail = newTail;
       this.tail.prev = oldTail;
       break;
     default:
       var newTail = new Segment(this.tail.x - this.tail.width, this.tail.y)
       this.tail = newTail;
       this.tail.prev = oldTail;
       return;
   }
 }

 startLength(){
   for(var i = 0; i < 5; i++) {
    this.addSegment();
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

  occupiedCoordinates(currentSegment=this.tail, occupied=[]) {
    occupied.push({x: currentSegment.x, y: currentSegment.y})
    if(currentSegment.prev === null) {
      return occupied;
    } else {
      return this.occupiedCoordinates(currentSegment.prev, occupied)
    }
  }

  ateFood(allFood) {
    if (this.head.x === allFood[0].x && this.head.y === allFood[0].y) {
      return 0;
    } else if (this.head.x === allFood[1].x && this.head.y === allFood[1].y) {
      return 1;
    } else {
      return false;
    }
  }

  loseTwoSegment() {
    if (this.tail.prev.prev){
      this.tail = this.tail.prev.prev;
    }
    else {
      this.head = null
    }
  }

  isDead() {
    return this.head === null  ||
    this.hitWall();
  }

  hitWall() {
    return !(this.head.x < this.game.canvas.width &&
      this.head.x > 0 && this.head.y < this.game.canvas.height &&
      this.head.y > 0)
  }
}

module.exports = Snake;
