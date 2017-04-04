var GameOver = function() {
  var playAgainBtn;
  this.update = function() {
    background(155, 123, 123);
    playAgainBtn.update();
    noLoop();
    return false;
  }

  this.pressedMouse = function() {
    if (playAgainBtn.overIt()) {
      console.log("restarting");
    }
  }

  this.init = function() {
    playAgainBtn = new Button(width/2 - 125, height/2 - 25, 250, 50, "Play Again");
    console.log("Game Over");
  }
}