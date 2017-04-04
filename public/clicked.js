var Clicked = function () {
  this.pressedMouse = function() {
    console.log("clickte tiklandi");
    var posX;
    var posY;
    if (fromIndex < 24 && fromIndex > -1) {
      posX = position[fromIndex];
      posY = fromIndex < 12 ? 0 : height - TRIANGLE_LENGTH;

      if (overRect(posX-TRIANGLE_EDGE, posY, 2*TRIANGLE_EDGE, TRIANGLE_LENGTH)) {
        setState(preState);
        return;
      }
    }
    var stop = false;
    possibleMoves.forEach(function(index, i){
      if(stop){
        return;
      }
      var check;
      if (index > 23) {
        check = overRect(map(1150, 0, 1440, 0, width), 0, map(290, 0, 1440, 0, width), height);
      } else {

        posX = position[index];
        posY = index < 12 ? 0 : height/2;
        check = overRect(posX-TRIANGLE_EDGE, posY, 2*TRIANGLE_EDGE, height/2);
      }

      if (check) { // move
        move(fromIndex, index);
        if (fromIndex > 23) fromIndex = -1;

        if (preState == ROLLED) {
          if (index - fromIndex == dice1 + dice2) {
            //currentState = State.NO_TURN; // change turn
            dice1 = dice2 = 0;
            setState(NO_TURN);
            stop = true;
          }
          if (index - fromIndex == dice1) {
            dice1 = 0;
          } else {
            dice2 = 0;
          }
          setState(ROLLED);
        } else if (preState == ROLLED_COUPLE) {
          var side = dice2;
          console.log(coupleLeft);
          coupleLeft -= (index - fromIndex) / side;
          console.log(" -> " + coupleLeft);
          if (coupleLeft == 0) {
            dice1 = dice2 = 0;
            setState(NO_TURN);
            stop = true;
          } else if (coupleLeft < 3) {
            dice1 = 0;
          }
          setState(ROLLED_COUPLE);
        }

        sendDices();
        stop = true;
      }
    });
  }

  this.update = function() {
    console.log(possibleMoves);
    console.log(finishing);
    possibleMoves.forEach(function(index, i){
      if (index < 24) {
        var posX = position[index];
        var posY = index < 12 ? TRIANGLE_LENGTH + 30 : height - TRIANGLE_LENGTH - 30;
        ellipse(posX, posY, 5, 5);
      } else {
        ellipse(1300, 360, 20, 20);
      }
    });
    return true;
  }

  move = function(from, to) {
    console.log(from + " to " + to);
    table[from]--;
    if (to >= 24) {
      table[26]++;
    } else if (table[to] == -1) {
      table[25]++;
      table[to] = 1;
    } else {
      table[to]++;
    }
    finishing = toplaniyorMu();
    sendTable(false);
  }

  this.init = function() {
    superInit();
  }
};