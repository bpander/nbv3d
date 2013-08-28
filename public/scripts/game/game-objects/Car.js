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
            new Physijs.BoxMesh(
                new THREE.CubeGeometry(3.5, 1, 6),
                new THREE.MeshLambertMaterial({ color: this.body })
            ),
            new Physijs.VehicleTuning(
                15.88,
                1.83,
                0.28,
                500,
                0.5,
                4000
            )
        );

        this._onKeyDown = this._onKeyDown.bind(this);

        this._onKeyUp = this._onKeyUp.bind(this);

        this._firedKeys = {};

        _init.call(this);
    };
    Car.prototype = new GameObject();
    Car.prototype.constructor = Car;

    var _init = function () {
        this.mesh.mesh.position.y = 200;
        this.mesh.mesh.castShadow = true;
        this.mesh.mesh.receiveShadow = true;
    };

    Car.prototype._onKeyDown = function (e) {
        if (this._firedKeys[e.keyCode] === true) {
            return;
        }
        switch (e.keyCode) {
            // case Input.KEYS.W:
            //     this.mesh.applyEngineForce(100);
            //     break;

            case Input.KEYS.A:
                this.mesh.setSteering(0.6, 0);
                this.mesh.setSteering(0.6, 1);
                break;

            case Input.KEYS.S:
                this.mesh.setBrake(20, 2);
                this.mesh.setBrake(20, 3);
                break;

            case Input.KEYS.D:
                this.mesh.setSteering(-0.6, 0);
                this.mesh.setSteering(-0.6, 1);
                break;
        }
        this._firedKeys[e.keyCode] = true;
    };

    Car.prototype._onKeyUp = function (e) {
        delete this._firedKeys[e.keyCode];
        switch (e.keyCode) {
            // case Input.KEYS.W:
            //     this.mesh.applyEngineForce(0);
            //     break;

            case Input.KEYS.S:
                this.mesh.setBrake(0.5, 2);
                this.mesh.setBrake(0.5, 3);
                break;

            case Input.KEYS.A:
            case Input.KEYS.D:
                this.mesh.setSteering(0, 0);
                this.mesh.setSteering(0, 1);
                break;
        }
    };

    Car.prototype.enableControl = function () {
        window.addEventListener('keydown', this._onKeyDown);
        window.addEventListener('keyup', this._onKeyUp);
    };

    Car.prototype.disableControl = function () {
        window.removeEventListener('keydown', this._onKeyDown);
        window.removeEventListener('keyup', this._onKeyUp);
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
                        i % 2 === 0 ? -2 : 2,
                        -0.25,
                        i < 2 ? 2.25 : -2.25
                ),
                new THREE.Vector3( 0, -1, 0 ),
                new THREE.Vector3( -1, 0, 0 ),
                0.2,
                0.7,
                i < 2 ? false : true
            );
        }
        this.mesh.setBrake(0.5, 2);
        this.mesh.setBrake(0.5, 3);
    };

    Car.prototype.add = function () {
        this.addWheels();
    };


    return Car;
});