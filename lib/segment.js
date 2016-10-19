var Block = require("./block");

class Segment extends Block {
  constructor(x, y, height, width){
    super(x, y, height, width);
    this.prev = null;
  }
}

module.exports = Segment;
