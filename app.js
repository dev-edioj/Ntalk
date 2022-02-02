var express = require('express'),
  load	=	require('express-load'),
	bodyParser	=	require('body-parser'),
	cookieParser	=	require('cookie-parser'),
  expressSession = require('express-session'),
  methodoOverride = require('method-override'),
  load = require('express-load'),
  error = require('./middleware/error'),
  app = express(),
  server = require('http').Server(app),
  io = require('socket.io')(server)

load('models')
  .then('controllers')
  .then('routes')
  .into(app);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookieParser('ntalk'));
app.use(expressSession());
app.use(methodoOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:	true}));
app.use(express.static(__dirname + '/public'));
app.use(error.notFound);
app.use(error.serverError);


server.listen(3000, function () {
  console.log('Ntalk no ar.');
});

