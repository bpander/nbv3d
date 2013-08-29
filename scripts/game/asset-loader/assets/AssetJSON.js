define([
    'game/asset-loader/assets/AssetBase',
    'three'
], function (
    AssetBase
) {
    "use strict";

    function AssetJSON () {
        AssetBase.apply(this, arguments);

        this.data = {};
    };
    AssetJSON.prototype = new AssetBase();
    AssetJSON.prototype.constuctor = AssetJSON;

    /**
     * The object used to load a JSON model we can use with THREEjs
     * @type {THREE.JSONLoader}
     * @static
     * @private
     */
    var _loader = new THREE.JSONLoader();

    /**
     * Uses _loader to load some JSON that THREEjs can use
     * @return {Q.Deferred}
     */
    AssetJSON.prototype.load = function () {
        _loader.load(this.src, function (model, materials) {
            this.data.model = model;
            this.data.materials = materials;
            this.loadComplete();
        }.bind(this));

        return AssetBase.prototype.load.call(this);
    };

    return AssetJSON;
});