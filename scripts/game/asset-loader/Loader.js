define([
    'jquery'
], function () {
    "use strict";

    function Loader () {};

    Loader.prototype.load = function (assets) {
        var dfd = new $.Deferred();
        var dfds = [];
        var numAssets = 0;
        var numAssetsLoaded = 0;
        var onLoad = function () {
            numAssetsLoaded++;
            dfd.notify(numAssetsLoaded, numAssets);
        };
        var assetDfd;
        var prop;
        for (prop in assets) {
            assetDfd = assets[prop].load().then(onLoad);
            dfds.push(assetDfd);
            numAssets++;
        }
        $.when.apply($, dfds).then(dfd.resolve, dfd.reject);
        return dfd.promise();
    };

    return Loader;
});