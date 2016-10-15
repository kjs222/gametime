const chai = require('chai');
const assert = chai.assert;
const Num = require("../lib/num")


describe("Num", function(){

  context("with calculated attributes", function(){

    it("instantiates", function(){
      assert.isObject(new Num(10));
    })

    it('has a maxNumber as passed attribuet', function(){
      let num = new Num(10);
      assert.equal(num.maxNumber, 10)
    })

    it('has a decimal attribute', function(){
      let num = new Num(10);
      assert.isAbove(num.decimal, 0)
      assert.isAtMost(num.decimal, 10)
    })

    it('has a binary attribute', function(){
      let num = new Num(10);
      let decimal = num.decimal
      assert.equal(num.binary, (decimal >>> 0).toString(2))
    })

    it('has a bitsToEat attribute set to current binary on instantiation', function(){
      let num = new Num(10);
      assert.equal(num.binary, num.bitsToEat)
    })
  })
})

describe("updateBitsToEat()", function(){

    it('removes first bit from list of bits', function(){
      let num = new Num(10);
      num.bitsToEat = '1001'
      num.updateBitsToEat();
      assert.equal(num.bitsToEat, "001")
    })
})


describe("nextBit()", function(){

    it('returns first bit from list of bits', function(){
      let num = new Num(10);
      num.bitsToEat = '1001'
      assert.equal(num.nextBit(), "1")
    })

})

describe("isSolved()", function(){

    it('returns false if num is not fully solved', function(){
      let num = new Num(10);
      num.bitsToEat = '10';
      num.updateBitsToEat();
      assert.isNotTrue(num.isSolved());
    })

    it('returns true if num is fully solved', function(){
      let num = new Num(10);
      num.bitsToEat = '10';
      num.updateBitsToEat();
      num.updateBitsToEat();
      assert.isTrue(num.isSolved())
    })

})
