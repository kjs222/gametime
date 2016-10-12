const chai = require('chai');
const assert = chai.assert;

const Food = require('../lib/food');

describe("Food", function(){

  context("with default attributes from segment class", function(){

    it('should be instantiated', function(){
      let food = new Food(50, 50);
      assert.isObject(food);
    })

    it('should have a height', function(){
      let food = new Food(50, 50);
      assert.equal(food.height, 10);
    })

    it('should have a width', function(){
      let food = new Food(50, 50);
      assert.equal(food.width, 10);
    })

  })

  context("with passed arguments", function(){

    it('should have an x coord', function(){
      let food = new Food(10, 50);
      assert.equal(food.x, 10);
    })

    it('should have a y coord', function(){
      let food = new Food(10, 50);
      assert.equal(food.y, 50);
    })

  })
})
