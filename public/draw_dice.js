var DrawDice = function () {

  var DICE_SIZE = 50;

  drawDice = function(x, y, side) {
    //dice
    noStroke();
    if(currentState == NO_TURN)
      fill(255, 123, 123);
    else
      fill('#FFF3D6');
    rect(x, y, DICE_SIZE, DICE_SIZE, DICE_SIZE/5);

    //dots
    fill(50);
    if (side == 1 || side == 3 || side == 5)
      ellipse(x, y, DICE_SIZE/5, DICE_SIZE/5); 
    if (side == 2 || side == 3 || side == 4 || side == 5 || side == 6) { 
      ellipse(x - DICE_SIZE/4, y - DICE_SIZE/4, DICE_SIZE/5, DICE_SIZE/5);
      ellipse(x + DICE_SIZE/4, y + DICE_SIZE/4, DICE_SIZE/5, DICE_SIZE/5);
    }
    if (side == 4 || side == 5 || side == 6) {
      ellipse(x - DICE_SIZE/4, y + DICE_SIZE/4, DICE_SIZE/5, DICE_SIZE/5);
      ellipse(x + DICE_SIZE/4, y - DICE_SIZE/4, DICE_SIZE/5, DICE_SIZE/5);
    }
    if (side == 6) {
      ellipse(x, y - DICE_SIZE/4, DICE_SIZE/5, DICE_SIZE/5);
      ellipse(x, y + DICE_SIZE/4, DICE_SIZE/5, DICE_SIZE/5);
    }
  }
  this.update = function() {
    var a = map(50, 0, 720, 0, height);
    var b = map(50, 0, 1440, 0, width);
    DICE_SIZE = min(a, b);
    rectMode(CENTER);
    if(dice1 != 0)
      drawDice(map(100, 0, 1440, 0, width), map(120, 0, 720, 0, height), dice1);
    if(dice2 != 0)
      drawDice(map(200, 0, 1440, 0, width), map(120, 0, 720, 0, height), dice2);
    rectMode(CORNER);
  }
}