const chai = require('chai');
const assert = chai.assert;
const stub = require('./support/stub');

const Menu = require('../lib/menu');
const MenuTyper = require("../lib/menuTyper");
const ScoreBoard = require("../lib/scoreBoard");

describe("Menu", function(){

  context("with default attributes", function(){

    it('should be instantiated', function(){
      let menu = new Menu();
      assert.isObject(menu);
    });

    it('should have scoreBoard', function(){
      let menu = new Menu();
      assert.equal(menu.scoreBoard.class, ScoreBoard.class);
    });

    it('should have menuTyper', function(){
      let menu = new Menu();
      assert.equal(menu.menuTyper.class, MenuTyper.class);
    });

  });
});
