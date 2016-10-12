const chai = require('chai');
const assert = chai.assert;
const stub = require('./support/stub')

const Game = require('../lib/game');
const Snake = require('../lib/snake');
const Food = require('../lib/food');
const Render = require('../lib/render');
const UserInput = require('../lib/userInput');

describe("Game", function(){

  context("with default attributes", function(){

    it('should be instantiated', function(){
      let game = new Game();
      assert.isObject(game);
    })

    it('should have snake', function(){
      let game = new Game();
      assert.equal(game.snake.class, Snake.class);
    })

    it('should have render', function(){
      let game = new Game();
      assert.equal(game.render.class, Render.class);
    })

    it('should have user input', function(){
      let game = new Game();
      assert.equal(game.userInput.class, UserInput.class);
    })
  })

  context("with passed in values", function(){
    it('should have a canvas', function(){
      let canvas = stub();
      let game = new Game(canvas);
      assert.isObject(game.canvas);
    })

    it('should have a context', function(){
      let canvas = stub();
      let context = stub();
      let game = new Game(canvas, context);
      assert.isObject(game.context);
    })
  })
})

describe("getRandomCoords()", function(){

  it('should generate random coords that are within canvas border', function(){
    let canvas = stub();
    canvas.width = 100;
    canvas.height = 100;
    let context = stub();
    let game = new Game(canvas, context);
    var coords = game.getRandomCoords();
    assert.isBelow(coords.x, game.canvas.width - 9)
    assert.isBelow(coords.y, game.canvas.height - 9)
    assert.isAbove(coords.x, 0)
    assert.isAbove(coords.y, 0)
  });

  it('should generate random coords that are multiples of 10', function(){
    let canvas = stub();
    canvas.width = 100;
    canvas.height = 100;
    let context = stub();
    let game = new Game(canvas, context);
    var coords = game.getRandomCoords();
    assert.equal(coords.x % 10, 0)
    assert.equal(coords.y % 10, 0)
  });
});

describe("selectFoodCoords()", function(){

  it('should generate random coords that are not on snake', function(){
    let canvas = stub();
    canvas.width = 100;
    canvas.height = 100;
    let context = stub();
    let game = new Game(canvas, context);
    game.snake.addSegment();
    var selectedCoords = game.selectFoodCoordinates()
    assert.notDeepEqual(selectedCoords, game.snake.occupiedCoordinates()[0])
    assert.notDeepEqual(selectedCoords, game.snake.occupiedCoordinates()[1])
  });

});

describe("replenishFood()", function(){

  it('should make a good object with x, y coords', function(){
    let canvas = stub();
    canvas.width = 100;
    canvas.height = 100;
    let context = stub();
    let game = new Game(canvas, context);
    let newFood = game.replenishFood();
    assert.isObject(newFood)
    assert(newFood.x)
    assert(newFood.y)
  });

});
