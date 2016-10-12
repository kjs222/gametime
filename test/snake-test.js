const chai = require('chai');
const assert = chai.assert;

const Snake = require('../lib/snake');

describe("Snake", function(){

  context("with default attributes", function(){

    it('should be instantiated', function(){
      let snake = new Snake();
      assert.isObject(snake);
    })
    // need to test all attributes
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
      assert.equal(snake.head.x, 40);
      assert.equal(snake.head.y, 50);
    })
    // need the rest of the directions
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
      assert.equal(snake.tail.x, 60);

    })
    // need the rest of the directions
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
      assert.equal(snake.tail.x, 60);
      assert.equal(snake.tail.y, 50);

      snake.moveSnake();

      assert.equal(snake.head.x, 60);
      assert.equal(snake.head.y, 50);
      assert.equal(snake.tail.x, 50);
      assert.equal(snake.tail.y, 50);

      snake.direction = 'up';
      snake.moveSnake();

      assert.equal(snake.head.x, 60);
      assert.equal(snake.head.y, 40);
      assert.equal(snake.tail.x, 60);
      assert.equal(snake.tail.y, 50);

      snake.direction = 'left';
      snake.moveSnake();

      assert.equal(snake.head.x, 50);
      assert.equal(snake.head.y, 40);
      assert.equal(snake.tail.x, 60);
      assert.equal(snake.tail.y, 40);
    })
  })
})
