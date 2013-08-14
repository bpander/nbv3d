define([
    'game/game-objects/GameObjectBase',
    'game/Input',
    'three',
    'physijs'
], function (
    GameObject,
    Input
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

        this._onKeyDown = this._onKeyDown.bind(this);

        this._onKeyUp = this._onKeyUp.bind(this);

    };
    Car.prototype = new GameObject();
    Car.prototype.constructor = Car;

    Car.prototype._onKeyDown = function (e) {
        switch (e.keyCode) {
            case Input.KEYS.W:
                this.mesh.applyEngineForce(600);
                break;

            case Input.KEYS.A:
                this.mesh.setSteering(0.5, 0);
                this.mesh.setSteering(0.5, 1);
                break;

            case Input.KEYS.S:
                this.mesh.setBrake(20, 2);
                this.mesh.setBrake(20, 3);
                break;

            case Input.KEYS.D:
                this.mesh.setSteering(-0.5, 0);
                this.mesh.setSteering(-0.5, 1);
                break;
        }
    };

    Car.prototype._onKeyUp = function (e) {
        switch (e.keyCode) {
            case Input.KEYS.W:
                this.mesh.applyEngineForce(0);
                break;

            case Input.KEYS.S:
                this.mesh.setBrake(0, 2);
                this.mesh.setBrake(0, 3);
                break;

            case Input.KEYS.A:
            case Input.KEYS.D:
                this.mesh.setSteering(0, 0);
                this.mesh.setSteering(0, 1);
                break;
        }
    };

    Car.prototype.enableControl = function (doEnableControl) {
        window.addEventListener('keydown', this._onKeyDown);
        window.addEventListener('keyup', this._onKeyUp);
    };

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

    Car.prototype.destroy = function () {
    };

    Car.prototype.bindEvents = function () {
    };


    return Car;
});