define([
    'jquery'
], function () {
    "use strict";

    function Loader () {};

    Loader.prototype.load = function (assets) {
        var dfd = new $.Deferred();
        var dfds = [];
        var assetDfd;
        var prop;
        for (prop in assets) {
            assetDfd = assets[prop].load().then(dfd.notify);
            dfds.push(assetDfd);
        }
        $.when.apply($, dfds).then(dfd.resolve, dfd.reject);
        return dfd.promise();
    };

    return Loader;
});