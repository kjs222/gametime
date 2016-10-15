class Num {
  constructor(maxNumber) {
    this.decimal = this.generateRandomNumber(maxNumber);
    this.binary = this.translateToBinary();
  }

  generateRandomNumber(maxNumber) {
    return Math.floor(Math.random() * maxNumber + 1)
  }

  translateToBinary(){
    return (this.decimal >>> 0).toString(2)
  }
}

module.exports = Num;
