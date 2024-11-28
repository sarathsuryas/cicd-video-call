const express = require('express')
const app = express()
var socketIO = require('socket.io');
var http = require('http');

app.set('view engine', 'ejs');
app.use(express.static('public'))

app.get("/", function(req, res){
	res.render("index.ejs");
});
app.get("/view", function(req, res){
	res.render("view.ejs");
});
app.get('/get',(req,res)=>{
  res.json({name:"sarath"})
})


var server = http.createServer(app);

server.listen(5000,()=>{
	console.log(`http://localhost:5000`)
});

var io = socketIO(server);

io.sockets.on('connection', (socket) => {
  function log() {
	  var array = ['Message from server:'];
	  array.push.apply(array, arguments);
	  socket.emit('log', array);
    
	}

  socket.on('message', (message, room) => {
    log('Client said: ', message)
    socket.in(room).emit('message', message,room)
  })

  socket.on("create or join", (room) => {
    log('Received request to create or join room ' + room)
    var clientsInRoom = io.sockets.adapter.rooms[room];
    var numClients = clientsInRoom ? Object.keys(clientsInRoom).length : 0;
    log('Room ' + room + ' now has ' + numClients + ' client(s)');
    if (numClients === 0) {
      socket.join(room)
    //   const rooms = io.sockets.adapter.rooms[room];
    //  console.log(rooms)
    // console.log(socket.id)
      log('Client ID ' + socket.id + ' created room ' + room);
      socket.emit("created", room, socket.id)
    } else if (numClients === 1) {
      log('Client ID ' + socket.id + ' joined room ' + room);
      // doubt
      socket.in(room).emit('join', room);
      socket.join(room);
      socket.emit('joined',room,socket.id)
      io.sockets.in(room).emit('ready')
    } else {
      socket.emit("full",room)
    }
  })

  

})

