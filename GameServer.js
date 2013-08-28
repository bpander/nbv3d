var socketIO = require('socket.io');


function GameServer () {

    this.io = null;

    this.onConnection = this.onConnection.bind(this);

    this.onKeyDown = this.onKeyDown.bind(this);

}

GameServer.prototype.start = function (server) {
    this.io = socketIO.listen(server);
    this.io.set('log level', 1);

    this.io.sockets.on('connection', this.onConnection);
};

GameServer.prototype.onConnection = function (socket) {
    socket.on('keydown', this.onKeyDown);
};

GameServer.prototype.onKeyDown = function () {
    this.sockets.forEach(function (socket) {
        socket.emit.apply('socket.keydown', );
    };
};

module.exports = GameServer;