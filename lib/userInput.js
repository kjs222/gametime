class UserInput {
  constructor() {
    this.keyCodeMapper = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
    }
  }
  sendUserInput(){
    var self = this
    var keyCode = window.addEventListener("keydown", function(event){
      return event.keyCode
   });
   console.log(this.keyCodeMapper, keyCode)
   return this.keyCodeMapper[keyCode]
  }
}

module.exports = UserInput;
