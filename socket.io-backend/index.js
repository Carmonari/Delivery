const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const port = 3000;

let deliverySocket = null;
let clientSocket = null;

io.on('connection', socket => {
  console.log('a user connected');
  socket.on('deliveryRequest', deliveryRoute => {
    clientSocket = socket;
    console.log('Alguien quiere un repartidor');
    if (deliverySocket !== null) {
      deliverySocket.emit('deliveryRequest', deliveryRoute);
    }
  });

  socket.on('deliveryLocation', deliveryLocation => {
    console.log(deliveryLocation);
    clientSocket.emit('deliveryLocation', deliveryLocation);
  });

  socket.on('clientRequest', () => {
    console.log('Alguien quiere una entrega');
    deliverySocket = socket;
  });
});

server.listen(port, () => console.log('server running on port:' + port));
