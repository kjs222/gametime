class Menu {
  constructor(scoreBoard, menuTyper){
    this.scoreBoard = scoreBoard;
    this.menuTyper = menuTyper
  }

  setup() {
    this.tabListener();
    this.scoreBoardListener();
    this.showInstructions();
    this.clearStatusMenu();
  }

  tabListener() {
    $(".tab").on('click', function(e){
        $('.tab').removeClass("active-tab");
        $(e.target).addClass("active-tab");
        $('.menu').hide();
        $('.'+$(e.target).attr('target')).show();
        if ($(e.target).attr('target') === "instructions") {
          this.showInstructions();
        }
        if ($(e.target).attr('target') === "scoreboard") {
          this.scoreBoard.populate();
        }
      }.bind(this));
  };

  scoreBoardListener() {
    $("#leaderName").on("keydown", function(event) {
      if (event.which == 13 || event.keycode == 13) {
        var leaderName = $("#leaderName").html();
        this.scoreBoard.updateHighScores(leaderName);
        $(".add-leader").hide();
        $("#leaderName").html("Enter Name Here.")
      }
    }.bind(this));
  }

  showInstructions(){
    $(".menu").hide();
    $(".instructions").show();
    $("#instructions-post-type").hide();
    this.menuTyper.typeStuff(" cat instructions.txt", $("#instructions-typer"), "instructions");
  }

  clearStatusMenu() {
    $(".echo").remove();
    $(".binary").remove();
  }

  prepareForGame(){
    this.clearStatusMenu();
    $(".status p").remove();
    $("#status-tab").click();
  }

}

module.exports = Menu;
