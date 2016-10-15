var Segment = require("./segment")

class Snake {
  constructor(game) {
    this.game = game;
    this.head = new Segment(120, 100);
    this.tail = this.head;
    this.direction = null;
  }

  setDirection(input) {
    this.direction = input;
  }

  moveHead() {
    if (this.head.x < this.game.canvas.width && this.head.x > 0 && this.head.y < this.game.canvas.height && this.head.y > 0) {
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
          return; //this is stopping the thing....
      }
    }  else {
        var context = this.game.context;
        context.font = "72px Trebuchet MS";
        context.fillStyle = "red"
        context.fillText("Game Over",300,250);
    }
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

  loseSegment() {
    this.tail = this.tail.prev.prev;
  }
}

module.exports = Snake;
