define([
], function (
) {
    "use strict";

    var GameObject = function () {

        this.geometry = null;

        this.material = null;

        this.mesh = null;

    };

    GameObject.prototype.update = function () {
        throw new Error('No update function implemented');
    };


    return GameObject;
});