var WaitingForRoll = function(){
  this.pressedMouse = function() {
    if (overRect(map(1170, 0, 1440, 0, width), map(20, 0, 720, 0, height), rollDiceBtn.wid, rollDiceBtn.hei)) { // rollDice
      dice1 = int(random(1, 7));
      dice2 = int(random(1, 7));
      //dice1 = 2; dice2 = 2;
      sendDices();
      if (isInJail) {
        if (table[dice1-1] < -1 && table[dice2-1] < -1) {
          setState(NO_TURN);
          return;
        }
      }
      rollDiceBtn.active = false;
      if (dice1 == dice2) {
        coupleLeft = 4;
      }

      setState(dice1 == dice2 ? ROLLED_COUPLE : ROLLED);
    }
  }

  this.init = function() {
    isInJail = table[24]>0;
    rollDiceBtn.active = true;
    finishing = toplaniyorMu();
    if(table[26] == 15){
      setState(GAME_OVER);
    }
  }
  this.update = function() {
    return true;
  }
}