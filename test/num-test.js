const chai = require('chai');
const assert = chai.assert;
// const stub = require('./support/stub')
const Num = require("../lib/num")


describe("Num", function(){

  context("with calculated attributes", function(){

    it("instantiates", function(){
      assert.isObject(new Num(10));
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
  })
})
