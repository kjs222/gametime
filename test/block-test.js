const chai = require('chai');
const assert = chai.assert;
const Block = require('../lib/block');

describe("Block", function(){

  context("with default attributes", function(){

    it('should be instantiated', function(){
      let block = new Block(10, 10);
      assert.isObject(block);
    });

    it('should have a height', function(){
      let block = new Block(10, 10);
      assert.equal(block.height, 20);
    });

    it('should have a width', function(){
      let block = new Block(10, 10);
      assert.equal(block.width, 20);
    });

  });

  context("with passed attributes", function(){
    it('should have a passed x-value', function(){
      let block = new Block(10, 20);
      assert.equal(block.x, 10);
    });
    it('should have a passed y-value', function(){
      let block = new Block(10, 20);
      assert.equal(block.y, 20);
    });
  });
});
