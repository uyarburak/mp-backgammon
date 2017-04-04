var WaitingOpponent = function() {
  var waitingBtn = new Button(1440/2 - 125, 720/2 - 25, 250, 50, "Waiting for opponent...");
  this.update = function() {
    background(255, 123, 123);
    waitingBtn.update();
    noLoop();
    return false;
  }

  this.pressedMouse = function() {
    return;
  }

  this.init = function() {
    return;
  }
}