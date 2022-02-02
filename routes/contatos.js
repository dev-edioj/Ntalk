const { application } = require("express");

module.exports = function (app) {
    var autenticar = require('./../middleware/autenticador'),
        contatos = app.controllers.contatos;
    
    app.get('/contatos', autenticar, contatos.index);
    app.get('/contatos/:id', autenticar, contatos.show);
    app.post('/contatos', autenticar, contatos.create);
    app.get('/contato/:id/editar', autenticar, contatos.edit);
    app.put('/contato/:id', autenticar, contatos.update);
    app.delete('/contato/:id', autenticar, contatos.destroy);
};


