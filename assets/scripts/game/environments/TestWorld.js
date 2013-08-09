/**
 * @fileOverview This is an example of how to extend the EnvironmentBase class
 */
define([
    'game/environments/EnvironmentBase',
    'game/game-objects/Car',
    'game/game-objects/Arena',
    'game/game-objects/ParkingSpots',
    'three'
], function (
    EnvironmentBase,
    Car,
    Arena,
    ParkingSpots
) {
    "use strict";

    var TestWorld = function () {
        EnvironmentBase.call(this);

        /**
         * A collection of THREEjs light objects in the scene
         * @type {THREE.Light[]}
         */
        this.lights = [];

        /**
         * The car that the user drives around
         * @type {Car}
         */
        this.car = null;

        /**
         * The arena that holds the car
         * @type {Arena}
         */
        this.arena = null;

    };
    TestWorld.prototype = new EnvironmentBase();
    TestWorld.prototype.constructor = TestWorld;

    TestWorld.prototype.ready = function () {

        // Set the camera up high and look down on the arena
        this.game.camera.position.set(0, 60, 0);
        this.game.camera.rotation.set(THREE.Math.degToRad(-90), 0, 0);

        // Create lights
        var light = new THREE.DirectionalLight( 0xFFFFFF );
        light.position.set( 10, 30, -10 );
        light.target.position.copy( this.game.scene.position );
        light.castShadow = true;
        light.shadowCameraLeft = -300;
        light.shadowCameraTop = -300;
        light.shadowCameraRight = 300;
        light.shadowCameraBottom = 300;
        light.shadowCameraNear = 20;
        light.shadowCameraFar = 400;
        light.shadowBias = -.0001
        light.shadowMapWidth = 2048;
        light.shadowMapHeight = light.shadowMapWidth;
        light.shadowDarkness = 0.7;
        this.game.scene.add(light);

        // Create objects
        this.car = new Car().load(function () {
            this.car.controls = true;
            this.add(this.car);
        }.bind(this));

        var secondCar = new Car().load(function () {
            secondCar.mesh.mesh.position.set(10, 2, 0);
            this.add(secondCar);
        }.bind(this));

        this.arena = new Arena();
        this.add(this.arena);

        this.parkingSpots = new ParkingSpots();
        this.add(this.parkingSpots);
    };

    TestWorld.prototype.update = function () {
    };


    return TestWorld;
});