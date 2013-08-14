define([
    'jquery'
], function (
) {
    "use strict";

    var EnvironmentBase = function (game) {

        /**
         * The game of which this environment is a child
         * @type {Game}
         */
        this.game = game;

        /**
         * The list of assets to load
         * @type {AssetBase{}}
         */
        this.assets = [];

        /**
         * The collection of all the game objects added to this environment
         * @type {GameObjectBase[]}
         */
        this.gameObjects = [];

        _init.call(this);
    };

    var _init = function () {
        this.progress = this.progress.bind(this);
        this.ready = this.ready.bind(this);
    };


    ////////////////////////////////////
    // ENVIRONMENT-SPECIFIC FUNCTIONS //
    ////////////////////////////////////

    /**
     * This runs when the environment finishes loading. Each environment should have a unique `ready` callback
     */
    EnvironmentBase.prototype.ready = function () {
        throw new Error('No ready function implemented');
    };

    /**
     * This runs every frame to update the environment. Each environment should have a unique `update` callback
     */
    EnvironmentBase.prototype.update = function () {
        throw new Error('No update function implemented');
    };

    /**
     * The callback to execute when the assets make progress loading
     * @param  {AssetBase} asset  The asset that was just loaded
     */
    EnvironmentBase.prototype.progress = function (asset) {
    };


    ////////////////////////////////
    // COMMON ENVIRONMENT METHODS //
    ////////////////////////////////

    /**
     * Start loading the environment. Will load everything in the assets array.
     * @return {Deferred}
     */
    EnvironmentBase.prototype.load = function () {
        return this.game.loader
            .load(this.assets)
            .progress(this.progress.bind(this))
            .then(this.ready.bind(this))
        ;
    };

    /**
     * Loops through all of the objects added to this environment and runs their update functions
     */
    EnvironmentBase.prototype.updateObjects = function () {
        // Run all the game objects' update functions
        var i = 0;
        var l = this.gameObjects.length;
        for (; i !== l; i++) {
            this.gameObjects[i].update();
        }
    };

    /**
     * Add a game object to this environment
     * @param {GameObjectBase} gameObject  An instance of a class extended from GameObjectBase
     */
    EnvironmentBase.prototype.add = function (gameObject) {
        gameObject.environment = this;
        this.gameObjects.push(gameObject);
        this.game.scene.add(gameObject.mesh);
        gameObject.add();
        return this;
    };

    /**
     * Remove a game object from the environment
     * @param  {GameObjectBase} gameObject  The instance to remove from this environment
     * @return {Number} The index the game object was at in the gameObjects array so -1 if not found
     */
    EnvironmentBase.prototype.remove = function (gameObject) {
        var indexToRemove = this.gameObjects.indexOf(gameObject);
        if (indexToRemove === -1) {
            return -1;
        }
        this.gameObjects.splice(indexToRemove, 1);
        return indexToRemove;
    };


    return EnvironmentBase;
});