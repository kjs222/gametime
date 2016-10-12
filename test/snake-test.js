const chai = require('chai');
const assert = chai.assert;

const Snake = require('../lib/snake');
const Segment = require('../lib/segment');

describe("Snake", function(){

  context("with default attributes", function(){

    it('should be instantiated', function(){
      let snake = new Snake();
      assert.isObject(snake);
    })

    it('should have game be undefined by default', function(){
      let snake = new Snake();
      assert.isUndefined(snake.game);
    })

    it('should have a default head', function(){
      let snake = new Snake();
      assert.equal(snake.head.class, new Segment(50, 50).class);
    })

    it('should have a default tail of its head', function(){
      let snake = new Snake();
      assert.equal(snake.tail, snake.head);
    })

    it('should have a default speed', function(){
      let snake = new Snake();
      assert.equal(snake.speed, 2);
    })

    it('should have a default direction of null', function(){
      let snake = new Snake();
      assert.isNull(snake.direction);
    })
  })
})

describe("setDirection()", function(){

  context("has default behavior", function(){

    it('it sets a direction', function(){
      let snake = new Snake()
      assert.isNull(snake.direction);
      snake.setDirection('left');
      assert.equal(snake.direction, 'left');
    })
  })
})

describe("moveHead()", function(){

  context("moves in a set direction", function(){

    it('it moves left', function(){
      let snake = new Snake()
      assert.equal(snake.head.x, 50);
      assert.equal(snake.head.y, 50);
      snake.direction = 'left';
      snake.moveHead();
      assert.equal(snake.head.x, 48);
      assert.equal(snake.head.y, 50);
    })

    it('it moves right', function(){
      let snake = new Snake()
      assert.equal(snake.head.x, 50);
      assert.equal(snake.head.y, 50);
      snake.direction = 'right';
      snake.moveHead();
      assert.equal(snake.head.x, 52);
      assert.equal(snake.head.y, 50);
    })

    it('it moves up', function(){
      let snake = new Snake()
      assert.equal(snake.head.x, 50);
      assert.equal(snake.head.y, 50);
      snake.direction = 'up';
      snake.moveHead();
      assert.equal(snake.head.x, 50);
      assert.equal(snake.head.y, 48);
    })

    it('it moves down', function(){
      let snake = new Snake()
      assert.equal(snake.head.x, 50);
      assert.equal(snake.head.y, 50);
      snake.direction = 'down';
      snake.moveHead();
      assert.equal(snake.head.x, 50);
      assert.equal(snake.head.y, 52);
    })
  })
})

describe("addSegment()", function(){

  context("add segments", function(){

    it('add segment to the right while moving left', function(){
      let snake = new Snake()
      assert.equal(snake.head, snake.tail);
      assert.equal(snake.head.x, 50);
      snake.direction = 'left';
      snake.addSegment();
      assert.notEqual(snake.head, snake.tail);
      assert.equal(snake.head.x, 50);
      assert.equal(snake.tail.x, 52);
    })

    it('add segment to the left while moving right', function(){
      let snake = new Snake()
      assert.equal(snake.head, snake.tail);
      assert.equal(snake.head.x, 50);
      snake.direction = 'right';
      snake.addSegment();
      assert.notEqual(snake.head, snake.tail);
      assert.equal(snake.head.x, 50);
      assert.equal(snake.tail.x, 48);
    })

    it('add segment to below when moving up', function(){
      let snake = new Snake()
      assert.equal(snake.head, snake.tail);
      assert.equal(snake.head.y, 50);
      snake.direction = 'up';
      snake.addSegment();
      assert.notEqual(snake.head, snake.tail);
      assert.equal(snake.head.y, 50);
      assert.equal(snake.tail.y, 52);
    })

    it('add segment above when moving down', function(){
      let snake = new Snake()
      assert.equal(snake.head, snake.tail);
      assert.equal(snake.head.y, 50);
      snake.direction = 'down';
      snake.addSegment();
      assert.notEqual(snake.head, snake.tail);
      assert.equal(snake.head.y, 50);
      assert.equal(snake.tail.y, 48);
    })

  })
})

describe("moveSnake()", function(){

  context("the snake moves", function(){

    it('moves in alllll directions', function(){
      let snake = new Snake();
      snake.direction = 'right';
      snake.addSegment();

      assert.equal(snake.head.x, 50);
      assert.equal(snake.head.y, 50);
      assert.equal(snake.tail.x, 52);
      assert.equal(snake.tail.y, 50);

      snake.moveSnake();

      assert.equal(snake.head.x, 52);
      assert.equal(snake.head.y, 50);
      assert.equal(snake.tail.x, 50);
      assert.equal(snake.tail.y, 50);

      snake.direction = 'up';
      snake.moveSnake();

      assert.equal(snake.head.x, 52);
      assert.equal(snake.head.y, 48);
      assert.equal(snake.tail.x, 52);
      assert.equal(snake.tail.y, 50);

      snake.direction = 'left';
      snake.moveSnake();

      assert.equal(snake.head.x, 50);
      assert.equal(snake.head.y, 48);
      assert.equal(snake.tail.x, 52);
      assert.equal(snake.tail.y, 48);
    })
  })
})
