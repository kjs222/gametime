class UserInput {
  constructor(game) {
    this.game = game;
    this.keyCodeMapper = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
    }
  }

  getUserInput(){
    window.addEventListener("keydown", this.sendUserInput.bind(this));
  }

  sendUserInput(event) {
    var input = this.keyCodeMapper[event.keyCode];
    var previousDirection = this.game.snake.direction;
    this.game.snake.setDirection(input, previousDirection);
  }
}

module.exports = UserInput;
