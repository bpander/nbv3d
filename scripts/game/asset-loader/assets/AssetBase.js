define(function () {
    "use strict";

    function AssetBase (src) {

        this.src = src;

        this.asset = null;

    };

    AssetBase.prototype.load = function () {
        throw new Error('No load function implemented');
    };

    return AssetBase;
});