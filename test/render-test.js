const chai = require('chai');
const assert = chai.assert;
const stub = require('./support/stub')

const Render = require('../lib/render')
const Segment = require('../lib/segment')
const Snake = require('../lib/snake')
const Food = require('../lib/food')


describe("Render", function(){

  context("with provided attributes", function(){

    it("instantiates", function(){
      let render =new Render("canvas", "context");
      assert.isObject(render);
    })

    it("instantiates with a canvas element", function(){
      let canvas = document.createElement("canvas")
      let render =new Render(canvas, "context");
      assert.equal(render.canvas, canvas)
      // assert.typeOf(render.canvas, <canvas></canvas>)
    })

    it("instantiates with a context", function(){
      let canvas = document.createElement("canvas")
      let context = canvas.getContext('2d')
      let render =new Render(canvas, context);
      assert.equal(render.context, context)
    })
  })
})


describe("drawSegment()", function(){

  it("should call strokeRect on the canvas", function(){
    let context = stub().of("strokeRect");
    let render = new Render("canvas", context);
    let segment = new Segment(10, 10);
    render.drawSegment(segment);
    assert.equal(render.context.strokeRect.calls.length, 1);
  })
})

describe("drawSnake()", function(){

  it("should call strokeRect on the canvas", function(){
    let context = stub().of("strokeRect");
    let render = new Render("canvas", context);
    let snake = new Snake('game');
    snake.addSegment();
    render.drawSnake(snake.tail);
    assert.equal(render.context.strokeRect.calls.length, 2);
  })
})

describe("drawFood()", function(){

    it("should call fillRect on the canvas", function(){
      let context = stub().of("fillRect");
      let render = new Render("canvas", context);
      let food = new Food(10, 10);
      render.drawFood(food);
      assert.equal(render.context.fillRect.calls.length, 1);
    })
})
