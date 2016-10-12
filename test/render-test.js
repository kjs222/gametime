const chai = require('chai');
const assert = chai.assert;

const Render = require('../lib/render')

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
