module.exports = function (io) {
    var crypto = require('crypto')
    var sockets = io.sockets;
   // Aguarda que um client envie uma msg p/ server através de algum evento.
    sockets.on('connection', function (client) {
        client.on('join', function (sala) {
            if (!sala) {
                var timestamp = new Date().toString(),
                    md5 = crypto.createHash('md5');
                sala = md5.update(timestamp).digest('hex');
            } 
            session.sala = sala;
            client.join(sala);
        });
        var session = client.handshake.session,
            usuario = session.usuario;
        client.on('send-server', function (msg) {
            var sala = session.sala,
                data = { email: usuario.email, sala: sala };
            msg = "<b> " + data.nome + " : </b> " + data.msg + " <b>";
            client.broadcast.emit('new-message', data);
            sockets.in(sala).emit('send-client', msg)
        });
        
        client.on('disconnect', function () {
            client.leave(session.sala);
        })
});   
}


