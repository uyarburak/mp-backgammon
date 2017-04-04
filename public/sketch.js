var socket;

var CLICKED = new Clicked();
var NO_TURN = new NoTurn();
var WAITING_FOR_ROLL = new WaitingForRoll();
var ROLLED = new Rolled();
var ROLLED_COUPLE = new RolledCouple();
var GAME_OVER = new GameOver();
var WAITING_FOR_OPPONENT = new WaitingOpponent();
var currentState = WAITING_FOR_OPPONENT;
var preState = WAITING_FOR_OPPONENT;


var rollDiceBtn;
var drawT;
var drawD;

var table = new Array(28).fill(0);
var position = new Array(24).fill(0);

var coupleLeft = 0;
var dice1 = 0;
var dice2 = 0;
var possibleMoves = [];
var fromIndex = -1;

var TRIANGLE_LENGTH;
var TRIANGLE_EDGE;

var isInJail;
var finishing;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  TRIANGLE_LENGTH = map(220, 0, 720, 0, height);
  TRIANGLE_EDGE = map(20, 0, 1440, 0, width);
  initialPositions();
  rollDiceBtn.wid = map(250, 0, 1440, 0, width);
  rollDiceBtn.hei = map(50, 0, 720, 0, height);
  redraw();
}

function setup() {
  socket = io.connect('http://etustalk.club:3000');
  //createCanvas(1440, 720);
  createCanvas(windowWidth, windowHeight);
  TRIANGLE_LENGTH = map(220, 0, 720, 0, height);
  TRIANGLE_EDGE = map(20, 0, 1440, 0, width);

  rollDiceBtn = new Button(20, 20, 250, 50, "Throw Dice");
  drawT = new DrawTable();
  drawD = new DrawDice();

  isInJail = table[24] > 0;
  finishing = toplaniyorMu();

  socket.on('table',
    // When we receive data
    function(data) {
      table = data.t.slice();
      console.log("table get:" + data.t);
      if(data.y){
        dice1 = dice2 = 0;
        setState(WAITING_FOR_ROLL);
      }else{
        redraw();
      }
    }
  );
  socket.on('dices',
    // When we receive data
    function(data) {
      dice1 = data.d1;
      dice2 = data.d2;
      redraw();
    }
  );
  socket.on('turn',
    // When we receive data
    function(data) {
	initGame();
      if(!data){
        setState(NO_TURN);
      }else{
        dice1 = dice2 = 0;
        setState(WAITING_FOR_ROLL);
      }
    }
  );
  socket.on('wait_opponent',
    // When we receive data
    function(data) {
      setState(WAITING_FOR_OPPONENT);
    }
  );

  noLoop();
}

function initGame(){
	table = new Array(28).fill(0);
    initialTable();
	dice1 = dice2 = 0;
}
function draw() {
  background(50);
  drawT.update();
  if(!currentState.update())
    return;
  translate(map(1150, 0, 1440, 0, width), 0);
  line(0, 0, 0, height);
  rollDiceBtn.update();
  drawD.update();
}
function superInit() {
  rollDiceBtn.active = false;

  isInJail = table[24]>0;
  finishing = toplaniyorMu();
  if(table[26] == 15){
    setState(GAME_OVER);
  }
}
function overRect(x, y, width, height) {
  return (mouseX >= x && mouseX <= x+width && 
    mouseY >= y && mouseY <= y+height);
}
function sendTable(yourTurn) {
  var newTable = new Array(28).fill(0);
  for(var i = 0; i < 24; i++){
    newTable[i] = -table[23-i];
  }
  newTable[24] = table[25];
  newTable[25] = table[24];
  newTable[26] = table[27];
  newTable[27] = table[26];
  
  var data = {
    t: newTable,
    y: yourTurn
  };

  console.log("table sent:" + newTable);
  socket.emit('table',data);
}
function sendDices() {
  
  var data = {
    d1: dice1,
    d2: dice2
  };

  console.log("dices sent:" + data);
  socket.emit('dices',data);
}

function mousePressed() {
  currentState.pressedMouse();
  //println(mouseX + " - " + mouseY);
  redraw();
}

function isPossible(from, index) {
  var check1 = index < 24 && table[index] >= -1;
  var check2 = finishing && index > 23;
  if (check2) {
    for (var i = 18; i < from; i++) {
      if (table[i] > 0 && 24-from != dice1 && 24-from != dice2) {
        check2 = false;
        break;
      }
    }
  }
  return check1 || check2;
}

function setState(newState) {
  preState = currentState;
  currentState = newState;

  console.log(preState.constructor.name + " -> " + currentState.constructor.name);
  currentState.init();
  if(newState != GAME_OVER){
    if(table[26] >=15 || table[27] >=15){
      setState(GAME_OVER);
    }
  }
  redraw();
}

function toplaniyorMu() {
  for (var i = 0; i < 18; i++) {
    if (table[i] > 0)
      return false;
  }
  return table[24]  < 1;
}
function hasPossibleMoves() {
  if (isInJail) {
    return true;
  }
  if (currentState == ROLLED_COUPLE || currentState == ROLLED) {
    for (var i = 0; i < 24; i++) {
      if (table[i] > 0 && checkPossibleMoves(i).length != 0)
        return true;
    }
  }
  return false;
}