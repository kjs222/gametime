class Num {
  constructor(maxNumber) {
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

  updateBitsToEat(){ //test
    this.bitsToEat = this.bitsToEat.slice(1, this.bitsToEat.length)
  }

  nextBit(){ //test
    return this.bitsToEat[0]
  }

}

module.exports = Num;
