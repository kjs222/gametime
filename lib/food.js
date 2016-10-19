var Block = require("./block");

class Food extends Block {
  constructor(x, y, height, width, binary){
    super(x, y, height, width);
    this.binary = binary;
  }
}

module.exports = Food;
