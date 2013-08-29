define([
    'socket.io'
], function (
    socketIO
) {
    'use strict';

    function GameServer () {

        this.io = null;

        this.onConnection = this.onConnection.bind(this);

    }

    GameServer.prototype.start = function (server) {
        this.io = socketIO.listen(server);
        this.io.set('log level', 1);

        this.io.sockets.on('connection', this.onConnection);
    };

    GameServer.prototype.onConnection = function (socket) {
        // socket.on('keydown', this.onKeyDown);
    };

    return GameServer;
});