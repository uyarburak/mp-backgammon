var Rolled = function() {
  this.pressedMouse = function(){
    var indexesOfRects = this.getAllRects();
    indexesOfRects.forEach(function(index, i){
      var posX = position[index];
      var posY = index < 12 ? 0 : height/2;
      if (overRect(posX-TRIANGLE_EDGE, posY, TRIANGLE_EDGE*2, height/2)) { // move
        fromIndex = index;
        possibleMoves = checkPossibleMovesNormal(index);
        if (possibleMoves.length == 0) {
          return;
        }
        console.log(possibleMoves);
        setState(CLICKED);
        return;
      }
    });
  }
  this.getAllRects = function(){
    var indexesOfRects = [];
    for (var i = 0; i < 24; i++) {
      if (table[i] > 0) indexesOfRects.push(i);
    }
    return indexesOfRects;
  }
  checkPossibleMovesNormal = function(index) {
    var moves = [];
    var check = false;
    if (dice1 != 0 && dice2 != 0) {
      if (isPossible(index, index + dice1)) {
        moves.push(index + dice1);
        var tmpDice1 = dice1;
        dice1 = 0;
        check = isPossible(index + tmpDice1, index + tmpDice1 + dice2);
        dice1 = tmpDice1;
      }
      if (isPossible(index, index + dice2)) {
        moves.push(index + dice2);
        var tmpDice2 = dice2;
        dice2 = 0;
        check = isPossible(index + tmpDice2, index + dice1 + tmpDice2);
        dice2 = tmpDice2;
      }
    } else if (dice1 != 0 && isPossible(index, index + dice1)) {
      moves.push(index + dice1);
    } else if (dice2 != 0 && isPossible(index, index + dice2)) {
      moves.push(index + dice2);
    }
    if (check) {
      moves.push(index + dice1 + dice2);
    }
    return moves;
  }
  this.init = function(){
    superInit();
    possibleMoves = [];
    if (isInJail) {
      if (dice1 != 0 && table[dice1-1] > -2) possibleMoves.push(dice1-1);
      if (dice2 != 0 && table[dice2-1] > -2) possibleMoves.push(dice2-1);
      if (possibleMoves.length == 0) {
        setState(NO_TURN); //hamle karsida
        return;
      }
      fromIndex = 24;
      setState(CLICKED);
    }
    if (!hasPossibleMoves()) {
      setState(NO_TURN); //hamle karsida
    }
  }
  this.update = function() {
    return true;
  }
}