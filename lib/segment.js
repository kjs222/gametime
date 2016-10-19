class Segment {
  constructor(x, y, solvedNumber) {
    this.height = 20;
    this.width = 20;
    this.x = x;
    this.y = y;
    this.prev = null;
    this.solvedNumber = solvedNumber || false;
  }
}

module.exports = Segment;
