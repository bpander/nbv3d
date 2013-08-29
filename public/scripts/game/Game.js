define([
    'game/asset-loader/Loader',
    'three',
    'physijs',
    'socket.io'
], function (
    Loader
) {
    "use strict";

    Physijs.scripts.worker = 'scripts/vendor/physijs_worker.js';

    /**
     * Holds all the info about your game
     * @constructor
     */
    function Game () {

        /**
         * THREEjs WebGL renderer
         * @type {THREE.WebGLRenderer}
         */
        this.renderer = null;

        /**
         * THREEjs camera object
         * @type {THREE.PerspectiveCamera}
         */
        this.camera = null;

        /**
         * Physijs scene
         * @type {Physjs.Scene}
         */
        this.scene = null;

        /**
         * The environment that we'll play the game in. Will be an instance of a class that extends EnvironmentBase.
         * @type {EnvironmentBase}
         */
        this.environment = null;

        /**
         * The thing you use to load assets
         * @type {Loader}
         */
        this.loader = new Loader();

        this.socket = null;

        this.animate = this.animate.bind(this);

        this._onResize = this._onResize.bind(this);

        _init.call(this);
    };

    /**
     * Initialize the game framework
     * @return {Game}
     */
    var _init = function () {

        // Create the renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.shadowMapEnabled = true;
        this.renderer.shadowMapSoft = true;

        // Set up the camera and scene
        this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 1000);

        this.scene = new Physijs.Scene();
        this.scene.setGravity(new THREE.Vector3( 0, -30, 0 ));
        this.scene.add(this.camera);

        this.socket = io.connect(SETTINGS.GAME_SERVER_ADDRESS);

        // Get the ball rolling...
        this.bindEvents();
    };

    /**
     * The animation loop
     */
    Game.prototype.animate = function () {
        this.scene.simulate(undefined, 2);
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.animate);
    };

    /**
     * Binds any event handlers
     * @return {Game}
     */
    Game.prototype.bindEvents = function () {
        window.addEventListener('resize', this._onResize, false);
        return this;
    };

    /**
     * Update the aspect ratio for THREEjs
     * @return {Game}
     */
    Game.prototype.setAspectRatio = function () {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        return this;
    };

    Game.prototype._onResize = function () {
        this.setAspectRatio();
    };

    /**
     * Hang the canvas element on some DOM element
     * @param  {Element} element  The element to append the canvas element to
     * @return {Game}
     */
    Game.prototype.appendTo = function (element) {
        element.appendChild(this.renderer.domElement);
        this.setAspectRatio();
        return this;
    };

    /**
     * Loads an environment
     * @param  {EnvironmentBase} environment  An instance of a class that is extended from EnvironmentBase that we want to run
     * @return {Deferred}
     */
    Game.prototype.loadEnvironment = function (environment) {
        this.environment = environment;
        this.environment.game = this;

        return this.environment.load();
    };


    return Game;
});