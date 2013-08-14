define([
    'game/game-objects/GameObjectBase',
    'three',
    'physijs'
], function (
    GameObject
) {
    "use strict";

    var Car = function (body, wheel) {
        GameObject.call(this);

        this.body = body;

        this.wheel = wheel;

        this.mesh = new Physijs.Vehicle(
            new Physijs.BoxMesh(this.body.model, new THREE.MeshFaceMaterial(this.body.materials)),
            new Physijs.VehicleTuning(
                10.88,
                1.83,
                0.28,
                500,
                10.5,
                6000
            )
        );
        this.mesh.mesh.position.y = 2;
        this.mesh.mesh.castShadow = true;
        this.mesh.mesh.receiveShadow = true;
    };
    Car.prototype = new GameObject();
    Car.prototype.constructor = Car;

    Car.prototype.addWheels = function () {
        var wheel = this.wheel.model;
        var wheelMaterial = new THREE.MeshFaceMaterial(this.wheel.materials);
        var i = 0;
        for (; i < 4; i++) {
            this.mesh.addWheel(
                wheel,
                wheelMaterial,
                new THREE.Vector3(
                        i % 2 === 0 ? -1.6 : 1.6,
                        -1,
                        i < 2 ? 3.3 : -3.2
                ),
                new THREE.Vector3( 0, -1, 0 ),
                new THREE.Vector3( -1, 0, 0 ),
                0.5,
                0.7,
                i < 2 ? false : true
            );
        }
    };

    Car.prototype.add = function () {
        this.addWheels();
    };

    Car.prototype.update = function () {
    };

    Car.prototype.destroy = function () {
    };

    Car.prototype.bindEvents = function () {
    };


    return Car;
});