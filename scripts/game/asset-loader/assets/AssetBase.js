define([
    'vendor/q.min'
], function (
    Q
) {
    "use strict";

    /**
     * The base class to use for all assets that require special loading methods
     * @param {String} src  What we set the src property as
     */
    function AssetBase (src) {

        /**
         * The path to the asset
         * @type {String}
         */
        this.src = src;

        /**
         * The place to store the data when we load the asset
         * @type {Object}
         */
        this.data = null;

        /**
         * Keeps track of the loading progress
         * @type {Deferred}
         */
        this.dfd = new Q.defer();

    };


    //////////////////////////////
    // ASSET-SPECIFIC FUNCTIONS //
    //////////////////////////////

    /**
     * Each Asset extension will implement this `load` method in its own way but each implementation MUST return the Q.Deferred (AssetBase.dfd)
     * @return {Q.Deferred}
     */
    AssetBase.prototype.load = function () {
        return this.dfd.promise;
    };


    //////////////////////////
    // COMMON ASSET METHODS //
    //////////////////////////

    /**
     * Call this when an asset is finished loading
     */
    AssetBase.prototype.loadComplete = function () {
        this.dfd.resolve(this);
    };

    return AssetBase;
});