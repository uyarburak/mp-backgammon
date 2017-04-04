console.log("Server is active");

var express = require('express');

var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

var io = require('socket.io')(server);

var availablePlayer = null;
var matches = {};

io.sockets.on('connection',
  // We are given a websocket object in our function
  function (socket) {
  
    console.log("We have a new client: " + socket.id);
    newPlayer(socket.id);
	console.log("Available Player: " + availablePlayer);
	console.log(matches);


    socket.on('table',
      function(data) {
        if(matches[socket.id] == null)
        	return;
        io.sockets.connected[matches[socket.id]]
        .emit('table', data);
      }
    );
    socket.on('dices',
      function(data) {
        if(matches[socket.id] == null)
            return;
        io.sockets.connected[matches[socket.id]]
        .emit('dices', data);
      }
    );


    socket.on('disconnect', function() {
      console.log("Client has disconnected: " + socket.id);
        if(availablePlayer == socket.id){
			availablePlayer = null;
	    }else{
	    	deleteMatch(socket.id);
	    }
		console.log("Available Player: " + availablePlayer);
		console.log(matches);
    });
});

function matchPlayers(player1, player2) {
	matches[player1] = player2;
	matches[player2] = player1;

    io.sockets.connected[player1]
        .emit('turn', true);
    io.sockets.connected[player2]
        .emit('turn', false);
}
function deleteMatch(player) {
	matches[matches[player]] = null;
	var tmp = matches[player];
	matches[player] = null;
    io.sockets.connected[tmp]
        .emit('wait_opponent', true);
	newPlayer(tmp);
}
function newPlayer(player){
	if(availablePlayer == null){
		availablePlayer = player;
	}else{
		matchPlayers(player, availablePlayer);
		io.sockets.connected[player]
        .emit('message', 'clear');
        io.sockets.connected[availablePlayer]
        .emit('message', 'clear');
		availablePlayer = null;
	}
}