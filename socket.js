//Una de las ventajas que trae socket.io con node es la reduccion de latencia
//en el intercambio de mensajes entre el cliente - servidor
//Por ejemplo si estas desarrollando un juego con multiplayer, chat app, 
//mostrar en tu web datos que cambian constantemente y en tiempo real
//o hacer push notification al client side cada vez que cambien datos 
//te recomiendo usar este api que es ligero y tiene muchas ventajas


//Como usarlo?
// Primero debemos instalarlo en nuestro proyecto utilizando npm
// npm install socket.io
// Luego utilizarlo en nuestro servidor node.

var app = require('http').createServer(handler);
var io = require('socket.io').listen(app).set('log level', 1);
var fs = require('fs');

app.listen(8080);

function handler (req, res) {
  fs.readFile(__dirname + '/cliente.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error cargando cliente.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  socket.emit('hm', { hola: 'mundo' });
  
  socket.emit('mensaje', { txt: 'Esto es una prueba', txt2: 'Esto es otra prueba' });
  
  socket.on('otro evento', function (data) {
  	console.log(data.envio);
  });


});