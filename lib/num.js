class Num {
  constructor(minNumber) {
    this.minNumber = parseInt(minNumber);
    this.decimal = this.generateRandomNumber();
    this.binary = this.translateToBinary();
    this.bitsToEat = this.binary;
  }

  generateRandomNumber() {
    return Math.floor(Math.random() * 10 + 1) + this.minNumber;
  }

  translateToBinary(){
    return (this.decimal >>> 0).toString(2);
  }

  updateBitsToEat(){
    this.bitsToEat = this.bitsToEat.slice(1, this.bitsToEat.length);
  }

  nextBit(){
    return this.bitsToEat[0];
  }

  isSolved() {
    return this.bitsToEat.length < 1;
  }
}

module.exports = Num;
