var $ = require("jquery");

class MenuTyper {
  constructor() {}

  cursorAnimation() {
    $('.new-cursor').animate({
      opacity: 0
    }, 'slow', 'swing').animate({
      opacity: 1
    }, 'slow ', 'swing');
  }

  typeStuff(text, container, menuName) {
    setInterval (this.cursorAnimation, 800);
    var textLength = 0;
    function typer() {
      container.html(text.substr(0, textLength++));
      if(textLength < text.length+1) {
        setTimeout(typer , 80);
      } else {
        $("#" + menuName + "-post-type").fadeIn(700);
        $(".new-cursor").hide();
        textLength = 0;
        text = '';
      }
    }
    typer();
  }
}

module.exports = MenuTyper;
