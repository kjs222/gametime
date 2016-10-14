class Num {
  constructor(maxNumber) {
    this.maxNumber = maxNumber;
    this.decimal = this.generateRandomNumber(maxNumber);
    this.binary = this.translateToBinary();
    this.bitsToEat = this.binary
  }

  generateRandomNumber(maxNumber) {
    return Math.floor(Math.random() * maxNumber + 1)
  }

  translateToBinary(){
    return (this.decimal >>> 0).toString(2)
  }

  updateBitsToEat(){
    this.bitsToEat = this.bitsToEat.slice(1, this.bitsToEat.length)
  }

  nextBit(){
    return this.bitsToEat[0]
  }

  numSolved() {
    return this.bitsToEat.length < 1;
  }

}

module.exports = Num;
