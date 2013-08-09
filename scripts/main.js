require([
    'lib-thirdparty/ready',
    'game/Game',
    'game/environments/TestWorld'
], function (
    ready,
    Game,
    TestWorld
) {
    "use strict";


    ready(function () {

        var game = new Game();
        var testWorld = new TestWorld();

        game.appendTo(document.body)
            .loadEnvironment(testWorld)
            .then(game.animate);

        // Allow console access to the game
        window.game = game;
    });

});