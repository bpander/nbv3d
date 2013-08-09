/**
 * @fileOverview This is an example of how to extend the EnvironmentBase class
 */
define([
    'game/environments/EnvironmentBase',
    'game/Input',
    'game/game-objects/Car',
    'game/game-objects/Arena',
    'three',
    'physijs'
], function (
    EnvironmentBase,
    Input,
    Car,
    Arena
) {
    "use strict";

    var TestWorld = function () {
        EnvironmentBase.call(this);

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
        this.game.camera.position.set(0, 50, 0);
        this.game.camera.rotation.set(THREE.Math.degToRad(-90), 0, 0);

        // Create lights
        var ambientLight = new THREE.AmbientLight(0xAAAAAA);
        this.game.scene.add(ambientLight);

        var directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.5);
        directionalLight.position.y = 200;
        directionalLight.castShadow = true;
        directionalLight.shadowMapWidth = 2048;
        directionalLight.shadowMapHeight = 2048;
        this.game.scene.add(directionalLight);

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
        this.arena.mesh.position.y = -10;
        this.add(this.arena);
    };

    TestWorld.prototype.update = function () {
    };


    return TestWorld;
});