var express = require('express');
var app = express();
var server = require('http').createServer(app);
var path = require('path');
var ejs = require('ejs');
var GameServer = require('./GameServer.js');

// Configuration
app.set('port', process.env.TEST_PORT || 80);
app.use(express.static(path.join(__dirname, 'public')));
app.engine('html', ejs.renderFile);

// Routes
app.get('/', function (req, res) {
    res.render(__dirname + '/views/index.html');
});

server.listen(app.get('port'), function () {
    new GameServer().start(server);
    console.log('Express server listening on port ' + app.get('port'));
});