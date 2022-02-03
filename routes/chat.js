module.exports = function (app) {
    var autenticar = require('./../middleware/autenticador'),
        chat = app.controllers.chat;
    app.get('/chat', autenticar, chat.index);
};
