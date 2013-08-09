define([
    'lib/Util',
    'game/Input',
    'three',
    'physijs'
], function (
    Util,
    Input
) {
    "use strict";

    Physijs.scripts.worker = 'assets/scripts/lib-thirdparty/physijs_worker.js';

    var Game = {

        /**
         * THREEjs WebGL renderer
         * @type {THREE.WebGLRenderer}
         */
        renderer: null,

        /**
         * THREEjs camera object
         * @type {THREE.PerspectiveCamera}
         */
        camera: null,

        /**
         * Physijs scene
         * @type {Physjs.Scene}
         */
        scene: null,

        /**
         * The environment that we'll play the game in. Will be an instance of a class that extends EnvironmentBase.
         * @type {EnvironmentBase}
         */
        environment: null
    };
    window.Game = Game;

    var _events = {

        onResize: function () {
            this.setAspectRatio();
        },

        onEnvironmentLoaded: function () {
            this.animate();
        },

        onClick: function (e) {
            // Util.requestPointerLock(e.currentTarget);
        }
    };


    /**
     * Initialize the game framework
     * @return {Game}
     */
    Game.init = function () {

        // Create the renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.shadowMapEnabled = true;
        this.renderer.shadowMapSoft = true;
        document.body.appendChild(this.renderer.domElement);

        // Set up the camera and scene
        this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 1000);
        this.setAspectRatio();

        this.scene = new Physijs.Scene();
        this.scene.setGravity(new THREE.Vector3( 0, -30, 0 ));
        this.scene.add(this.camera);

        // Get the ball rolling...
        Input.init();
        this.bindScope();
        this.bindEvents();

        return this;
    };

    /**
     * The animation loop
     */
    Game.animate = function () {
        this.render();
        requestAnimationFrame(this.animate);
    };

    /**
     * Run the physics simulation, update the environment, update the input object and render the scene
     */
    Game.render = function () {
        this.scene.simulate(undefined, 2);
        this.environment.updateObjects();
        this.environment.update();
        Input.update();
        this.renderer.render(this.scene, this.camera);
    };

    /**
     * Binds the `this` argument for any function that needs it
     * @return {Game}
     */
    Game.bindScope = function () {
        Util.bindAll(_events, this);
        this.animate = this.animate.bind(this);
        return this;
    };

    /**
     * Binds any event handlers
     * @return {Game}
     */
    Game.bindEvents = function () {
        window.addEventListener('resize', _events.onResize, false);
        this.renderer.domElement.addEventListener('click', _events.onClick);
        return this;
    };

    /**
     * Update the aspect ratio for THREEjs
     * @return {Game}
     */
    Game.setAspectRatio = function () {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize( window.innerWidth, window.innerHeight );
        return this;
    };

    /**
     * Loads an environment and runs it when it's finished
     * @param  {EnvironmentBase} environment  An instance of a class that is extended from EnvironmentBase that we want to run
     * @return {Game}
     */
    Game.loadEnvironment = function (environment) {
        this.environment = environment;
        this.environment.game = this;

        this.environment.load(_events.onEnvironmentLoaded);
        return this;
    };


    return Game;
});