require([
    'lib-thirdparty/ready', // Because there's no sense loading jQuery if all we use it for is the 'onready' callback
    'game/Game',
    'game/environments/TestWorld'
], function (
    ready,
    Game,
    TestWorld
) {
    "use strict";


    ready(function () {

        var testWorld = new TestWorld();
        Game.init().loadEnvironment(testWorld);

    });

});