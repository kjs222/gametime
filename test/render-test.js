const chai = require('chai');
const assert = chai.assert;
const stub = require('./support/stub');
const Render = require('../lib/render');
const Segment = require('../lib/segment');
const Snake = require('../lib/snake');
const Food = require('../lib/food');

describe("Render", function(){

  context("with provided attributes", function(){

    it("instantiates", function(){
      let render =new Render("canvas", "context");
      assert.isObject(render);
    });

    it("instantiates with a canvas element", function(){
      let canvas = document.createElement("canvas");
      let render =new Render(canvas, "context");
      assert.equal(render.canvas, canvas);
    });

    it("instantiates with a context", function(){
      let canvas = document.createElement("canvas");
      let context = canvas.getContext('2d');
      let render =new Render(canvas, context);
      assert.equal(render.context, context);
    });
  });
});


describe("drawSegment()", function(){

  it("should call fillRect on the canvas", function(){
    let context = stub().of("strokeRect").of("fillRect");
    let render = new Render("canvas", context);
    let segment = new Segment(10, 10);
    render.drawSegment(segment);
    assert.equal(render.context.fillRect.calls.length, 1);
  });
});

describe("drawSnake()", function(){

  it("should call strokeRect and FillRect on the canvas", function(){
    let context = stub().of("strokeRect").of("fillRect");
    let render = new Render("canvas", context);
    let snake = new Snake('game');
    snake.addSegment();
    render.drawSnake(snake.tail);
    assert.equal(render.context.strokeRect.calls.length, 2);
    assert.equal(render.context.fillRect.calls.length, 1);
  });
});

describe("drawFood()", function(){

  let context = stub().of("fillRect").of('strokeRect').of('fillText');
  it("should call fillRect on the canvas", function(){
    let render = new Render("canvas", context);
    let food = { 0: new Food(10, 10), 1: new Food(20, 30) };
    render.drawFood(food);
    assert.equal(render.context.fillRect.calls.length, 2);
    assert.equal(render.context.fillRect.calls[0][0], 10);
    assert.equal(render.context.fillRect.calls[0][1], 10);
    assert.equal(render.context.fillRect.calls[1][0], 20);
    assert.equal(render.context.fillRect.calls[1][1], 30);
    assert.equal(render.context.strokeRect.calls.length, 2);
    assert.equal(render.context.fillText.calls.length, 2);
  });
});
