module.exports = function (io) {
    var sockets = io.sockets;
   // Aguarda que um client envie uma msg p/ server através de algum evento.
    sockets.on('connection', function (client) { 
        var session = client.handshake.session,
            usuario = session.usuario;
        client.on('send-server', function (data) {
            msg = "<b> " + data.nome + " : </b> " + data.msg + " <b>";
            client.emit('send-client', msg);
            client.broadcast.emit('send-client', msg);
  });
});   
}


