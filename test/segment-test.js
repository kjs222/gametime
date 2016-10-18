const chai = require('chai');
const assert = chai.assert;

const Segment = require('../lib/segment');

// beforeEach(function(){
//   var seg = new Segment(10, 10);
//   return seg
// })

describe("Segment", function(){

  context("with default attributes", function(){

    it('should be instantiated', function(){
      let seg = new Segment(10, 10);
      assert.isObject(seg);
    });

    it('should have a height', function(){
      let seg = new Segment(10, 10);
      assert.equal(seg.height, 20);
    });

    it('should have a width', function(){
      let seg = new Segment(10, 10);
      assert.equal(seg.width, 20);
    });

    it('should have a prev as null', function(){
      let seg = new Segment(10, 10);
      assert.isNull(seg.prev);
    });
  });

  context("with passed attributes", function(){
    it('should have a passed x-value', function(){
      let seg = new Segment(10, 20);
      assert.equal(seg.x, 10);
    });
    it('should have a passed y-value', function(){
      let seg = new Segment(10, 20);
      assert.equal(seg.y, 20);
    });
  });
});
