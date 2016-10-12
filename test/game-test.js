const chai = require('chai');
const assert = chai.assert;

const Game = require('../lib/game');
const Snake = require('../lib/snake');
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
      let game = new Game(document.getElementById('canvas'));
      assert.isNull(game.canvas)
    })

    it('should have a context', function(){
      let canvas = document.getElementById('canvas')
      let game = new Game(canvas.getContext('2d'));
      assert.isNull(game.context)
    })

    // failed test. Because canvas in null in this instance,
    // context cannot be called on the canvas.
    // How do we test this?
  })
})
