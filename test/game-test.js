const chai = require('chai');
const assert = chai.assert;
const stub = require('./support/stub');

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
    });

    it('should have snake', function(){
      let game = new Game();
      assert.equal(game.snake.class, Snake.class);
    });

    it('should have render', function(){
      let game = new Game();
      assert.equal(game.render.class, Render.class);
    });

    it('should have user input', function(){
      let game = new Game();
      assert.equal(game.userInput.class, UserInput.class);
    });

    it('should have food', function(){
      let game = new Game();
      assert.deepEqual(game.food, { 0: null , 1: null});
    });

    it('should have a score', function() {
      let game = new Game();
      assert.equal(game.score, 0);
    });
  });

  context("with passed in values", function(){
    it('should have a canvas', function(){
      let canvas = stub();
      let game = new Game(canvas);
      assert.isObject(game.canvas);
    });

    it('should have a context', function(){
      let canvas = stub();
      let context = stub();
      let game = new Game(canvas, context);
      assert.isObject(game.context);
    });
  });
});

describe("getRandomCoords()", function(){

  it('should generate random coords that are within canvas border', function(){
    let canvas = stub();
    canvas.width = 100;
    canvas.height = 100;
    let context = stub();
    let game = new Game(canvas, context);
    var coords = game.getRandomCoords();
    assert.isBelow(coords.x, game.canvas.width - 9);
    assert.isBelow(coords.y, game.canvas.height - 9);
    assert.isAbove(coords.x, 0);
    assert.isAbove(coords.y, 0);
  });

  it('should generate random coords that are multiples of 10', function(){
    let canvas = stub();
    canvas.width = 100;
    canvas.height = 100;
    let context = stub();
    let game = new Game(canvas, context);
    var coords = game.getRandomCoords();
    assert.equal(coords.x % 10, 0);
    assert.equal(coords.y % 10, 0);
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
    var selectedCoords = game.selectFoodCoordinates();
    assert.notDeepEqual(selectedCoords, game.snake.occupiedCoordinates()[0]);
    assert.notDeepEqual(selectedCoords, game.snake.occupiedCoordinates()[1]);
  });
});

describe("snakeAteCorrectFood()", function(){
  it("returns true when snake ate a correct 1", function(){
    let canvas = stub();
    let context = stub();
    canvas.width = 100;
    canvas.height = 100;
    let game = new Game(canvas, context);
    game.currentNumber.bitsToEat = "10";
    assert(game.snakeAteCorrectFood(1));
  });

  it("returns true when snake ate a correct 0", function(){
    let canvas = stub();
    let context = stub();
    canvas.width = 100;
    canvas.height = 100;
    let game = new Game(canvas, context);
    game.currentNumber.bitsToEat = "0";
    assert(game.snakeAteCorrectFood(0));
  });

  it("returns false when snake ate nothing", function(){
    let canvas = stub();
    let context = stub();
    canvas.width = 100;
    canvas.height = 100;
    let game = new Game(canvas, context);
    game.currentNumber.bitsToEat = "0";
    assert.isFalse(game.snakeAteCorrectFood(false));
  });
});

describe("snakeAteFood()", function(){

  it('should set food[0] to null if snake eats food[0]', function(){
    let canvas = stub();
    let context = stub();
    canvas.width = 100;
    canvas.height = 100;
    let game = new Game(canvas, context);
    game.snake.startLength();
    game.food = { 0: new Food(120, 100), 1: new Food(10, 10) };
    game.snakeAteFood();
    assert.isNull(game.food[0]);
  });

  it('should set food[1] to null if snake eats food[1]', function(){
    let canvas = stub();
    canvas.width = 100;
    canvas.height = 100;
    let context = stub();
    let game = new Game(canvas, context);
    game.food = { 0: new Food(10, 10), 1: new Food(120, 100) };
    game.snakeAteFood();
    assert.deepEqual(game.food[1], null);
  });

  it('should add segment if snake eats correct food[0]', function(){
    let canvas = stub();
    canvas.width = 100;
    canvas.height = 100;
    let context = stub();
    let game = new Game(canvas, context);
    game.currentNumber.bitsToEat = "0";
    game.food = {0: new Food(120, 100), 1: new Food(10, 10) };
    assert.equal(game.snake.head, game.snake.tail);
    game.snakeAteFood();
    assert.notEqual(game.snake.head, game.snake.tail);
  });

  it('should add segment if snake eats correct food[1]', function(){
    let canvas = stub();
    canvas.width = 100;
    canvas.height = 100;
    let context = stub();
    let game = new Game(canvas, context);
    game.currentNumber.bitsToEat = "1";
    game.food = { 0: new Food(10, 10), 1: new Food(120, 100) };
    assert.equal(game.snake.head, game.snake.tail);
    game.snakeAteFood();
    assert.notEqual(game.snake.head, game.snake.tail);
  });

  it('should NOT add segment if snake eats incorrect food', function(){
    let canvas = stub();
    canvas.width = 100;
    canvas.height = 100;
    let context = stub();
    let game = new Game(canvas, context);
    game.snake.addSegment();
    game.currentNumber.bitsToEat = "0";
    game.food = { 0: new Food(10, 10), 1: new Food(120, 100) };
    game.snakeAteFood();
    assert.isNull(game.snake.head);
  });

  it('should NOT add segment if snake does NOT eat food', function(){
    let canvas = stub();
    canvas.width = 100;
    canvas.height = 100;
    let context = stub();
    let game = new Game(canvas, context);
    game.food = { 0: new Food(10, 10), 1: new Food(50, 50) };
    assert.equal(game.snake.head, game.snake.tail);
    game.snakeAteFood();
    assert.equal(game.snake.head, game.snake.tail);
  });


  it('should not empty food if snake did not eat food', function(){
    let canvas = stub();
    canvas.width = 100;
    canvas.height = 100;
    let context = stub();
    let game = new Game(canvas, context);
    game.food = { 0: new Food(10, 10), 1: new Food(40, 40) };
    game.snakeAteFood();
    assert.isNotNull(game.food[0]);
    assert.isNotNull(game.food[1]);
  });

});

describe("updateSnake()", function(){

  it('should NOT grow snake if it did NOT eat food', function(){
    let canvas = stub();
    canvas.width = 100;
    canvas.height = 100;
    let context = stub();
    let game = new Game(canvas, context);
    game.food = {0: new Food(50, 60), 1: new Food(10, 10) };
    game.updateSnake();
    assert.equal(game.snake.head, game.snake.tail);
  });

  it('should grow snake if it DID eat correct food', function(){
    let canvas = stub();
    canvas.width = 100;
    canvas.height = 100;
    let context = stub();
    let game = new Game(canvas, context);
    game.currentNumber.bitsToEat = "0";
    game.food = {0: new Food(120, 100), 1: new Food(20, 20) };
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
    game.snake.direction = "right";
    game.food = {0: new Food(60, 60), 1: new Food(10, 10) };
    game.updateSnake();
    assert.equal(game.snake.head.x, 140);
  });
});

describe("handleSolvedNumber()", function(){

  it('should reset CurrentNumber if Current Number is solved', function(){
    let canvas = stub();
    canvas.width = 1000;
    canvas.height = 1000;
    let context = stub();
    let game = new Game(canvas, context);
    let oldNum = game.currentNumber;
    game.currentNumber.bitsToEat = "";
    game.handleSolvedNumber();
    assert.isAtLeast(game.score, oldNum.decimal);
    assert.notDeepEqual(oldNum, game.currentNumber);
  });

  it('should NOT reset CurrentNumber if Current Number is not solved', function(){
    let canvas = stub();
    canvas.width = 100;
    canvas.height = 100;
    let context = stub();
    let game = new Game(canvas, context);
    let oldNum = game.currentNumber;
    game.currentNumber.bitsToEat = "1";
    game.handleSolvedNumber();
    assert.deepEqual(oldNum, game.currentNumber);
  });
});

describe("replenishFood()", function(){

  it('should make a food object with x, y coords', function(){
    let canvas = stub();
    canvas.width = 100;
    canvas.height = 100;
    let context = stub();
    let game = new Game(canvas, context);
    game.replenishFood();
    assert.isObject(game.food[0]);
    assert.isObject(game.food[1]);

    assert(game.food[0].x);
    assert(game.food[0].y);
    assert.equal(game.food[0].binary, 0);

    assert(game.food[1].x);
    assert(game.food[1].y);
    assert.equal(game.food[1].binary, 1);

  });

  it('should replenish food when food is null', function(){
    let canvas = stub();
    canvas.width = 100;
    canvas.height = 100;
    let context = stub();
    let game = new Game(canvas, context);
    game.replenishFood();
    assert.isObject(game.food);
  });

  it('should not replenish food when it has food and snake location is different', function(){
    let canvas = stub();
    canvas.width = 100;
    canvas.height = 100;
    let context = stub();
    let game = new Game(canvas, context);
    game.food = new Food(10, 20);

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
    game.snake.startLength();
    game.food = {0: new Food(140, 100), 1: new Food(10, 10) };
    game.snake.direction = "right";
    assert(game.food[0].x === 140 && game.food[0].y === 100);
    game.snake.moveSnake();
    assert.equal(game.snake.head.x, 140);
    assert.equal(game.snake.head.y, 100);
    game.snakeAteFood();
    game.replenishFood();
    assert(!(game.food[0].x === 140 && game.food[0].y === 100));
  });
});

describe("updateScore()", function(){

  it('should increment the score', function(){
    let game = new Game();
    game.updateScore();
    assert.equal(game.score, 1);
  });
});
