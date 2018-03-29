var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var host = process.env.HOST || "0.0.0.0";

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('*', function (req, res) {
  console.log(' request received ', req.headers.host);
  res.status(200).send();
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

socket.on('ferret', function (name, fn) {
    console.log('name', name, 'fn', fn);
    fn('tarun');
  });
});

http.listen(port,host, function(){
  console.log('listening on *:' + port);
  console.log('Env name is ' + process.env.name)
});
