var requirejs = require('requirejs');

requirejs([
    'express',
    'http',
    'path',
    'ejs',
    './GameServer'
], function (
    express,
    http,
    path,
    ejs,
    GameServer
) {

    var app = express();
    var server = http.createServer(app);

    // Configuration
    app.set('port', process.env.TEST_PORT || 80);
    app.use(express.static(path.join(__dirname, '/')));
    app.engine('html', ejs.renderFile);

    // Routes
    app.get('/', function (req, res) {
        res.render(__dirname + '/views/index.html');
    });

    server.listen(app.get('port'), function () {
        new GameServer().start(server);
        console.log('Express server listening on port ' + app.get('port'));
    });

});