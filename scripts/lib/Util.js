define([
], function (
) {
    "use strict";

    var Util = {};

    Util.bindAll = function (methodObject, thisArg) {
        var methodName;
        for (methodName in methodObject) {
            if (methodObject[methodName] instanceof Function) {
                methodObject[methodName] = methodObject[methodName].bind(thisArg);
            }
        }
    };

    Util.noop = function () {};

    Util.requestPointerLock = function(elem) {
        elem.requestPointerLock = elem.requestPointerLock || elem.mozRequestPointerLock || elem.webkitRequestPointerLock || Util.noop;
        elem.requestPointerLock();
    };


    return Util;
});