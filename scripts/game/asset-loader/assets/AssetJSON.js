define([
    'game/asset-loader/assets/AssetBase',
    'three',
    'jquery'
], function (
    AssetBase
) {
    "use strict";

    function AssetJSON () {
        AssetBase.apply(this, arguments);

        this.asset = {};
    };
    AssetJSON.prototype = new AssetBase();
    AssetJSON.prototype.constuctor = AssetJSON;

    var _loader = new THREE.JSONLoader();

    AssetJSON.prototype.load = function () {
        var dfd = new $.Deferred();
        _loader.load(this.src, function (model, materials) {
            this.asset.model = model;
            this.asset.materials = materials;
            dfd.resolve();
        }.bind(this));
        return dfd.promise();
    };

    return AssetJSON;
});