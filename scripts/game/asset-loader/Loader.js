define([
    'vendor/q.min'
], function (
    Q
) {
    "use strict";

    function Loader () {};

    Loader.prototype.load = function (assets) {
        var dfds = [];
        var assetDfd;
        var prop;
        for (prop in assets) {
            assetDfd = assets[prop].load();
            dfds.push(assetDfd);
        }
        return Q.all(dfds);
    };

    return Loader;
});