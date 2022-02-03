var express = require('express'),
  load	=	require('express-load'),
	bodyParser	=	require('body-parser'),
	cookieParser	=	require('cookie-parser'),
  expressSession = require('express-session'),
  methodoOverride = require('method-override'),
  //load = require('express-load'),
  error = require('./middleware/error'),
  app = express(),
  server = require('http').Server(app),
  io = require('socket.io')(server)

  // Aguarda que um client envie uma msg p/ server através de algum evento.
io.sockets.on('connection', function (client) { 
  client.on('send-server', function (data) {
    var msg = "<b> " + data.nome + " : </b> " + data.msg + " <b>";
    client.emit('send-client', msg);
    client.broadcast.emit('send-client', msg);
  });
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(methodoOverride('_method'));
app.use(cookieParser('ntalk'));
app.use(expressSession());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:	true}));
app.use(express.static(__dirname + '/public'));


load('models')
  .then('controllers')
  .then('routes')
  .into(app);

app.use(error.notFound);
app.use(error.serverError);

server.listen(3000, function () {
  console.log('Ntalk no ar.');
});

