var RolledCouple = function() {
  this.pressedMouse = function(){
    var indexesOfRects = this.getAllRects();
    indexesOfRects.forEach(function(index, i){
      var posX = position[index];
      var posY = index < 12 ? 0 : height/2;
      if (overRect(posX-TRIANGLE_EDGE, posY, TRIANGLE_EDGE*2, height/2)) { // move
        fromIndex = index;
        possibleMoves = checkPossibleMovesCouple(index);
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
  checkPossibleMovesCouple = function(index) {
    var moves = [];
    if(isInJail){
      for (var i = 1; i <= coupleLeft; i++) {
        var val = i * dice2;
        if (isPossible(index, index + val)){
           moves.push(index + val);
           if(index + val > 23){
            break;
           }
        }
        else break;
      }
    }else{
      for (var i = 1; i <= coupleLeft; i++) {
        var val = i * dice2;
        if (isPossible(index, index + val)) moves.push(index + val);
        else break;
      }
    }
    return moves;
  }
  checkPossibleMoves = function(index) {
    if(currentState == ROLLED){
      return checkPossibleMovesNormal(index);
    }else if(currentState == ROLLED_COUPLE){
      return checkPossibleMovesCouple(index);
    }else{
      if(preState == ROLLED){
        return checkPossibleMovesNormal(index);
      }else{
        return checkPossibleMovesCouple(index);
      }
    }
  }
  this.init = function(){
    superInit();
    possibleMoves = [];
    console.log(isInJail);
    if (isInJail) {
      if (table[dice2-1] > -2) {
        possibleMoves.push(dice2-1);
        fromIndex = 24;
        setState(CLICKED);
      } else {
        setState(NO_TURN); //hamle karsida
      }
    }
    if(!hasPossibleMoves()){
      setState(NO_TURN); //hamle karsida
    }
  }
  this.update = function() {
    return true;
  }
}