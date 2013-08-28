define([
], function (
) {
    "use strict";

    var GameObject = function () {

        this.geometry = null;

        this.material = null;

        this.mesh = null;

    };

    GameObject.prototype.add = function () {
        throw new Error('No add function implemented');
    };


    return GameObject;
});