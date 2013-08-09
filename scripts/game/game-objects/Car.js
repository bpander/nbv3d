define([
    'game/game-objects/GameObjectBase',
    'three',
    'physijs'
], function (
    GameObject
) {
    "use strict";

    var Car = function () {
        GameObject.call(this);

        this.init();
    };
    Car.prototype = new GameObject();
    Car.prototype.constructor = Car;


    Car.prototype.init = function () {
    };

    Car.prototype.load = function (fn) {
        var self = this;
        var loader = new THREE.JSONLoader();
        loader.load('models/mustang/mustang.js', function (car, carMaterials) {
            loader.load('models/mustang/mustang_wheel.js', function (wheel, wheel_materials) {
                var mesh = new Physijs.BoxMesh(car, new THREE.MeshFaceMaterial(carMaterials));
                mesh.position.y = 2;
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                self.mesh = new Physijs.Vehicle(mesh, new Physijs.VehicleTuning(
                    10.88,
                    1.83,
                    0.28,
                    500,
                    10.5,
                    6000
                ));
                fn();
                var wheel_material = new THREE.MeshFaceMaterial( wheel_materials );

                for ( var i = 0; i < 4; i++ ) {
                    self.mesh.addWheel(
                        wheel,
                        wheel_material,
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

                if (!self.controls) {
                    return;
                }

                var input = {
                    power: null,
                    direction: null,
                    steering: 0
                };

                document.addEventListener('keydown', function( ev ) {
                    switch ( ev.keyCode ) {
                        case 65: // left
                            input.direction = 0.5;
                            break;

                        case 87: // forward
                            input.power = true;
                            break;

                        case 68: // right
                            input.direction = -0.5;
                            break;

                        case 83: // back
                            input.power = false;
                            break;
                    }
                });
                document.addEventListener('keyup', function( ev ) {
                    switch ( ev.keyCode ) {
                        case 65: // left
                            input.direction = 0;
                            break;

                        case 87: // forward
                            input.power = null;
                            break;

                        case 68: // right
                            input.direction = 0;
                            break;

                        case 83: // back
                            input.power = null;
                            break;
                    }
                });

        self.environment.game.scene.addEventListener(
            'update',
            function() {

                if ( input && self.mesh ) {
                    self.mesh.setSteering( input.direction, 0 );
                    self.mesh.setSteering( input.direction, 1 );

                    if ( input.power === true ) {
                        self.mesh.applyEngineForce( 600 );
                    } else if ( input.power === false ) {
                        self.mesh.setBrake( 20, 2 );
                        self.mesh.setBrake( 20, 3 );
                    } else {
                        self.mesh.applyEngineForce( 0 );
                    }
                }
            }
        );







            });
        });

        return this;
    };

    Car.prototype.update = function () {
    };

    Car.prototype.destroy = function () {
    };

    Car.prototype.bindEvents = function () {
    };


    return Car;
});