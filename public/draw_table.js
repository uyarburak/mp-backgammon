var DrawTable = function () {
  var TWO_RADIAN = 40;
  var X_OFFSET = 10;

  // var f = createFont("Arial", 16, true); // STEP 2 Create Font

  this.update = function() {
    TWO_RADIAN = map(40, 0, 720, 0, height);
    X_OFFSET = map(10, 0, 1440, 0, width);
    stroke(0);
    for (var i = 0; i < 12; i++) {
      var pos = position[i];
      if (i % 2 == 0) {
        fill(160, 0, 70);
        triangle(pos - TRIANGLE_EDGE, 0, pos + TRIANGLE_EDGE, 0, pos, TRIANGLE_LENGTH);
        fill(0, 140, 120);
        triangle(pos - TRIANGLE_EDGE, height, pos + TRIANGLE_EDGE, height, pos, height-TRIANGLE_LENGTH);
      } else {
        fill(0, 140, 120);
        triangle(pos - TRIANGLE_EDGE, 0, pos + TRIANGLE_EDGE, 0, pos, TRIANGLE_LENGTH);
        fill(160, 0, 70);
        triangle(pos - TRIANGLE_EDGE, height, pos + TRIANGLE_EDGE, height, pos, height-TRIANGLE_LENGTH);
      }
    }

    var avg = (position[5] + position[6]) / 2;
    strokeWeight(3);
    stroke(255, 0, 0);
    line(avg, 0, avg, height);
    translate(0, height/2);
    line(0, 0, map(1150, 0, 1440, 0, width), 0);

    translate(0, -height/2);
    strokeWeight(1);
    for (var i = 0; i < 24; i++) {
      var value = table[i];
      if (value > 0) {
        fill(255);
      } else if (value < 0) {
        fill(0);
      } else {
        continue;
      }
      drawEllipses(abs(value), position[i], i < 12);
    }
    var jailUser = table[24];
    var jailOther = table[25];
    if (jailUser > 0) {
      fill(255);
      ellipse(map(570, 0, 1440, 0, width) - TWO_RADIAN/2, height/2, TWO_RADIAN, TWO_RADIAN);
      fill(0);
      text(""+jailUser, map(570, 0, 1440, 0, width) - TWO_RADIAN/2 - 5, height/2 + 5);   // STEP 5 Display Text
    }
    if (jailOther > 0) {
      fill(0);
      ellipse(map(570, 0, 1440, 0, width) + TWO_RADIAN/2, height/2, TWO_RADIAN, TWO_RADIAN);
      fill(255);
      text(""+jailOther, map(565, 0, 1440, 0, width) + TWO_RADIAN/2, height/2 + 5);   // STEP 5 Display Text
    }
    
    var finishUser = table[26];
    var finishOther = table[27];
    if (finishUser > 0) {
      fill(255);
      ellipse(map(1150, 0, 1440, 0, width) + TWO_RADIAN*0.75, height/2-TWO_RADIAN*0.75, TWO_RADIAN*1.5, TWO_RADIAN*1.5);
      fill(0);
      text(""+finishUser, map(1150, 0, 1440, 0, width) + TWO_RADIAN*0.75 - 5, height/2-TWO_RADIAN*0.75+ 5);   // STEP 5 Display Text
    }
    if (finishOther > 0) {
      fill(0);
      ellipse(map(1150, 0, 1440, 0, width) + TWO_RADIAN*0.75, height/2+TWO_RADIAN*0.75, TWO_RADIAN*1.5, TWO_RADIAN*1.5);
      fill(255);
      text(""+finishOther, map(1150, 0, 1440, 0, width) + TWO_RADIAN*0.75 - 5, height/2+TWO_RADIAN*0.75+ 10);   // STEP 5 Display Text
    }
    
    
  }
  initialTable = function() {	  
    table[0] = 2;
    table[11] = 5;
    table[16] = 3;
    table[18] = 5;

    table[23] = -2;
    table[12] = -5;
    table[5] = -5;
    table[7] = -3;
  }
  
  initialPositions = function() {
    var pos = 0;
    for (var i = 11; i >= 0; i--) {
      pos += X_OFFSET + TRIANGLE_EDGE * 4;
      position[23-i] = position[i] = pos;
    }
  }


  drawEllipses = function(value, xPos, upper) {
    var direction = upper ? 1 : -1;
    var yPos = upper ? 0 : height;
    yPos += (TWO_RADIAN/2)*direction;
    for (var i = 0; i < value; i++) {
      ellipse(xPos, yPos, TWO_RADIAN, TWO_RADIAN);
      yPos += TWO_RADIAN*direction;
    }
  }



  
  initialTable();
  initialPositions();
}