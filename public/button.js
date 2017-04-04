var Button = function (tx, ty, tw, th, tlabel) {
  this.xpos = tx;
  this.ypos = ty;
  this.wid = tw;
  this.hei = th;
  this.label = tlabel;
  this.active = true;

  this.update = function() {
    if (this.active) {
      smooth();
      fill(255);
      stroke(0);
      rect(this.xpos, this.ypos, this.wid, this.hei, 10);//draws the rectangle, the last param is the round corners
      fill(0);
      textSize(24);
      text(this.label, this.xpos+this.wid/2-(textWidth(this.label)/2), this.ypos+this.hei/2+(textAscent()/2)); 
      //all of this just centers the text in the box
    } else {
      smooth();
      fill(100);
      stroke(0);
      rect(this.xpos, this.ypos, this.wid, this.hei, 10);//draws the rectangle, the last param is the round corners
      fill(0);
      textSize(24);
      text(this.label, this.xpos+this.wid/2-(textWidth(this.label)/2), this.ypos+this.hei/2+(textAscent()/2)); 
      //all of this just centers the text in the box
    }
  }
  this.overIt = function() {
    return overRect(this.xpos, this.ypos, this.wid, this.hei);
  }
}