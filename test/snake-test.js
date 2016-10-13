const chai = require('chai');
const assert = chai.assert;
const stub = require('./support/stub')

const Snake = require('../lib/snake');
const Segment = require('../lib/segment');
const Game = require('../lib/game');

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
  let canvas = stub();
  canvas.width = 100;
  canvas.height = 100;
  let game = new Game(canvas);

  context("moves in a set direction", function(){

    it('it moves left', function(){
      let snake = new Snake(game);

      assert.equal(snake.head.x, 60);
      assert.equal(snake.head.y, 60);
      snake.direction = 'left';
      snake.moveHead();
      assert.equal(snake.head.x, 40);
      assert.equal(snake.head.y, 60);
    })

    it('it moves right', function(){
      let snake = new Snake(game);

      assert.equal(snake.head.x, 60);
      assert.equal(snake.head.y, 60);
      snake.direction = 'right';
      snake.moveHead();
      assert.equal(snake.head.x, 80);
      assert.equal(snake.head.y, 60);
    })

    it('it moves up', function(){
      let snake = new Snake(game);

      assert.equal(snake.head.x, 60);
      assert.equal(snake.head.y, 60);
      snake.direction = 'up';
      snake.moveHead();
      assert.equal(snake.head.x, 60);
      assert.equal(snake.head.y, 40);
    })

    it('it moves down', function(){
      let snake = new Snake(game);

      assert.equal(snake.head.x, 60);
      assert.equal(snake.head.y, 60);
      snake.direction = 'down';
      snake.moveHead();
      assert.equal(snake.head.x, 60);
      assert.equal(snake.head.y, 80);
    })
  })
})

describe("addSegment()", function(){
  let canvas = stub();
  canvas.width = 100;
  canvas.height = 100;
  let game = new Game(canvas);

  context("add segments", function(){

    it('add segment to the right while moving left', function(){
      let snake = new Snake(game)
      assert.equal(snake.head, snake.tail);
      assert.equal(snake.head.x, 60);
      snake.direction = 'left';
      snake.addSegment();
      assert.notEqual(snake.head, snake.tail);
      assert.equal(snake.head.x, 60);
      assert.equal(snake.tail.x, 80);
    })

    it('add segment to the left while moving right', function(){
      let snake = new Snake(game)
      assert.equal(snake.head, snake.tail);
      assert.equal(snake.head.x, 60);
      snake.direction = 'right';
      snake.addSegment();
      assert.notEqual(snake.head, snake.tail);
      assert.equal(snake.head.x, 60);
      assert.equal(snake.tail.x, 40);
    })

    it('add segment to below when moving up', function(){
      let snake = new Snake(game)
      assert.equal(snake.head, snake.tail);
      assert.equal(snake.head.y, 60);
      snake.direction = 'up';
      snake.addSegment();
      assert.notEqual(snake.head, snake.tail);
      assert.equal(snake.head.y, 60);
      assert.equal(snake.tail.y, 80);
    })

    it('add segment above when moving down', function(){
      let snake = new Snake(game)
      assert.equal(snake.head, snake.tail);
      assert.equal(snake.head.y, 60);
      snake.direction = 'down';
      snake.addSegment();
      assert.notEqual(snake.head, snake.tail);
      assert.equal(snake.head.y, 60);
      assert.equal(snake.tail.y, 40);
    })
  })
})

describe("moveSnake()", function(){
  let canvas = stub();
  canvas.width = 100;
  canvas.height = 100;
  let game = new Game(canvas);

  context("the snake moves", function(){

    it('moves in alllll directions', function(){
      let snake = new Snake(game);
      snake.direction = 'right';
      snake.addSegment();

      assert.equal(snake.head.x, 60);
      assert.equal(snake.head.y, 60);
      assert.equal(snake.tail.x, 40);
      assert.equal(snake.tail.y, 60);

      snake.moveSnake();

      assert.equal(snake.head.x, 80);
      assert.equal(snake.head.y, 60);
      assert.equal(snake.tail.x, 60);
      assert.equal(snake.tail.y, 60);

      snake.direction = 'up';
      snake.moveSnake();

      assert.equal(snake.head.x, 80);
      assert.equal(snake.head.y, 40);
      assert.equal(snake.tail.x, 80);
      assert.equal(snake.tail.y, 60);

      snake.direction = 'left';
      snake.moveSnake();

      assert.equal(snake.head.x, 60);
      assert.equal(snake.head.y, 40);
      assert.equal(snake.tail.x, 80);
      assert.equal(snake.tail.y, 40);
    })
  })

  describe("occupiedCoordinates()", function() {

    context("returns list of snake's occupied coords", function(){

      it("returns correct list for single segment snake", function() {
        let snake = new Snake();
        assert.equal(snake.head.x, 60);
        assert.equal(snake.head.y, 60);
        assert.deepEqual(snake.occupiedCoordinates(), [{x: 60, y: 60}]);
      })

      it("returns correct list for multi segment snake", function() {
        let snake = new Snake();
        snake.direction = "right";
        snake.addSegment();
        assert.equal(snake.head.x, 60);
        assert.equal(snake.head.y, 60);
        assert.equal(snake.tail.x, 40);
        assert.equal(snake.tail.y, 60);
        assert.deepEqual(snake.occupiedCoordinates(), [{x: 40, y: 60}, {x: 60, y: 60}]);
      })
    })
  })
})
