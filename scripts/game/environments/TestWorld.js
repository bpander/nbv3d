/**
 * @fileOverview This is an example of how to extend the EnvironmentBase class
 */
define([
    'game/environments/EnvironmentBase',
    'game/asset-loader/assets/AssetJSON',
    'game/game-objects/Car',
    'game/game-objects/Arena',
    'game/game-objects/ParkingSpots',
    'three'
], function (
    EnvironmentBase,
    AssetJSON,
    Car,
    Arena,
    ParkingSpots
) {
    "use strict";

    var TestWorld = function () {
        EnvironmentBase.call(this);

        this.assets = {
            mustang: new AssetJSON('models/mustang/mustang.js'),
            mustangWheel: new AssetJSON('models/mustang/mustang_wheel.js')
        };

        /**
         * A collection of THREEjs light objects in the scene
         * @type {THREE.Light[]}
         */
        this.light = new THREE.DirectionalLight(0xFFFFFF);

        /**
         * The cars that have been spawned
         * @type {Car[]}
         */
        this.cars = [];

        /**
         * The arena that holds the cars
         * @type {Arena}
         */
        this.arena = null;

    };
    TestWorld.prototype = new EnvironmentBase();
    TestWorld.prototype.constructor = TestWorld;

    TestWorld.prototype.progress = function (asset) {
        console.log('TestWorld progress', arguments);
    };

    TestWorld.prototype.ready = function () {

        // Set the camera up high and look down on the arena
        this.game.camera.position.set(0, 100, 0);
        this.game.camera.rotation.set(THREE.Math.degToRad(-90), 0, 0);

        // Setup light rig
        this.light.position.set( 10, 100, -10 );
        this.light.target.position.copy( this.game.scene.position );
        this.light.castShadow = true;
        this.light.shadowCameraLeft = -300;
        this.light.shadowCameraTop = -300;
        this.light.shadowCameraRight = 300;
        this.light.shadowCameraBottom = 300;
        this.light.shadowCameraNear = 20;
        this.light.shadowCameraFar = 400;
        this.light.shadowBias = -.0001;
        this.light.shadowMapWidth = 2048;
        this.light.shadowMapHeight = this.light.shadowMapWidth;
        this.light.shadowDarkness = 0.7;
        this.game.scene.add(this.light);

        this.arena = new Arena();
        this.add(this.arena);

        this.parkingSpots = new ParkingSpots();
        this.add(this.parkingSpots);

        this.spawnCar();
    };

    TestWorld.prototype.spawnCar = function () {
        var car = new Car(this.assets.mustang.data, this.assets.mustangWheel.data);
        car.mesh.mesh.position.set(-30, 2, 0);
        car.mesh.mesh.rotation.y = THREE.Math.degToRad(90);
        car.enableControl();
        this.add(car);
        // car.mesh.applyEngineForce(600);
    };


    return TestWorld;
});