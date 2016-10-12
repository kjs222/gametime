var Segment = require("./segment")

class Food extends Segment {
  constructor(x, y, binary){
    super(x, y);
    this.binary = binary || 0;
  }

}

module.exports = Food;
