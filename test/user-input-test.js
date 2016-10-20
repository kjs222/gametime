let chai = require('chai');
let assert = chai.assert;
const UserInput = require("../lib/userInput.js");
const Game = require("../lib/game.js");

describe("UserInput", function(){

  context("it instantiates with correct attributes", function(){

    it("instantiates", function(){
      let ui = new UserInput();
      assert.isObject(ui);
    });

    it("has a game attribute", function(){
      let game = new Game("canvas", "context");
      let ui = new UserInput(game);
      assert.equal(ui.game, game);
    });

    it("has a keyCode Mapper default attribute", function(){
      let game = new Game("canvas", "context");
      let ui = new UserInput(game);
      assert.isObject(ui.keyCodeMapper);
      assert.equal(ui.keyCodeMapper[37], "left");
      assert.equal(ui.keyCodeMapper[38], "up");
      assert.equal(ui.keyCodeMapper[39], "right");
      assert.equal(ui.keyCodeMapper[40], "down");
    });
  });
});
