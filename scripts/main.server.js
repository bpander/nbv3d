requirejs([
    'express',
    'http',
    'path',
    'fs',
    'game/GameServer'
], function (
    express,
    http,
    path,
    fs,
    GameServer
) {

    /**
     * Express server
     */
    var app = express();
    var server = http.createServer(app);
    app.set('port', process.env.PORT || 80);


    /**
     * Routes
     */

    // Setup everything to be public since both the server AND client need access
    app.use(express.static(path.join(path.resolve('./'), '/')));

    // Output index.html when a user navigates to the root
    app.get('/', function (req, res) {
        var html = fs.readFileSync('index.html');
        res.writeHeader(200, { 'Content-Type': 'text/html' });
        res.end(html);
    });


    /**
     * Start listening for requests and spin up the GameServer
     */
    server.listen(app.get('port'), function () {
        console.log('Express server listening on port ' + app.get('port'));
        new GameServer().start(server);
    });

});