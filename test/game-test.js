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

describe("snakeAteFood()", function(){

  it('should return true if snake head and food in same location', function(){
    let canvas = stub();
    canvas.width = 100;
    canvas.height = 100;
    let context = stub();
    let game = new Game(canvas, context);
    game.food = new Food(60, 60)
    assert(game.snakeAteFood())
  });

  it('should return false if snake head and food are NOT in same location', function(){
    let canvas = stub();
    canvas.width = 100;
    canvas.height = 100;
    let context = stub();
    let game = new Game(canvas, context);
    game.food = new Food(60, 50)
    assert(!game.snakeAteFood())
  });

});

describe("updateSnake()", function(){

  it('should NOT grow snake if it did NOT eat food', function(){
    let canvas = stub();
    canvas.width = 100;
    canvas.height = 100;
    let context = stub();
    let game = new Game(canvas, context);
    game.food = new Food(60, 50)

    game.updateSnake();
    assert.equal(game.snake.head, game.snake.tail);
  });

  it('should grow snake if it DID eat food', function(){
    let canvas = stub();
    canvas.width = 100;
    canvas.height = 100;
    let context = stub();
    let game = new Game(canvas, context);
    game.food = new Food(60, 60)

    game.updateSnake();
    assert.notEqual(game.snake.head, game.snake.tail);
    assert.equal(game.snake.tail.prev, game.snake.head);
  });

  it('should move snake if snake has direction', function(){
    let canvas = stub();
    canvas.width = 100;
    canvas.height = 100;
    let context = stub();
    let game = new Game(canvas, context);
    game.snake.direction = "right"
    game.food = new Food(20,20)
    game.updateSnake();
    assert.equal(game.snake.head.x, 80);
  });
});

describe("replenishFood()", function(){

  it('should make a food object with x, y coords', function(){
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

  it('should replenish food when food is null', function(){
    let canvas = stub();
    canvas.width = 100;
    canvas.height = 100;
    let context = stub();
    let game = new Game(canvas, context);
    let newFood = game.replenishFood();
    assert.isObject(game.food)
  });

  it('should not replenish food when it has food and snake location is different', function(){
    let canvas = stub();
    canvas.width = 100;
    canvas.height = 100;
    let context = stub();
    let game = new Game(canvas, context);
    game.food = new Food(10, 20)

    assert.equal(game.food.x, 10);
    assert.equal(game.food.y, 20);

    game.replenishFood();

    assert.equal(game.food.x, 10);
    assert.equal(game.food.y, 20);
  });

  it('should replenish food when snake hits food', function(){
    let canvas = stub();
    canvas.width = 100;
    canvas.height = 100;
    let context = stub();
    let game = new Game(canvas, context);
    game.food = new Food(80, 60)
    game.snake.direction = "right"

    assert(game.food.x === 80 && game.food.y === 60)

    game.snake.moveSnake();
    assert.equal(game.snake.head.x, 80);
    assert.equal(game.snake.head.y, 60);

    game.replenishFood();

    assert(!(game.food.x === 80 && game.food.y === 60))
    assert(game.food)

  });
});
