var NoTurn = function(){
	// init yazilacak
  this.init = function() {
    superInit();
    sendTable(true);
  }

  this.pressedMouse = function() {
    return;
  }
  this.update = function() {
    return true;
  }
}