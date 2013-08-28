/**
 * @fileOverview This is an example of how to extend the EnvironmentBase class
 */
define([
    'game/environments/EnvironmentBase',
    'game/asset-loader/assets/AssetJSON',
    'game/game-objects/Arena',
    'game/game-objects/ParkingSpots',
    'game/models/Player',
    'three'
], function (
    EnvironmentBase,
    AssetJSON,
    Arena,
    ParkingSpots,
    Player
) {
    "use strict";

    var TestWorld = function () {
        EnvironmentBase.call(this);

        this.assets = {
            mustangWheel: new AssetJSON('models/mustang/mustang_wheel.js')
        };

        this.players = [
            new Player(TestWorld.PLAYER_SLOTS[0]),
            new Player(TestWorld.PLAYER_SLOTS[1])
        ];

        /**
         * A collection of THREEjs light objects in the scene
         * @type {THREE.Light[]}
         */
        this.light = new THREE.DirectionalLight(0xFFFFFF);

        this.numCarsSpawned = 0;

        /**
         * The arena that holds the cars
         * @type {Arena}
         */
        this.arena = null;

        this.onUpdate = this.onUpdate.bind(this);

    };
    TestWorld.prototype = new EnvironmentBase();
    TestWorld.prototype.constructor = TestWorld;

    TestWorld.PLAYER_SLOTS = [
        {
            body: 0xff0000,
            spawnPoints: [
                {
                    position: { x: -65, y: 2, z: -21 },
                    rotation: { x: 0, y: THREE.Math.degToRad(90), z: 0 },
                    velocity: { x: 50, y: 0, z: 0 }
                },
                {
                    position: { x: -65, y: 2, z: 21 },
                    rotation: { x: 0, y: THREE.Math.degToRad(90), z: 0 },
                    velocity: { x: 50, y: 0, z: 0 }
                }
            ]
        },
        {
            body: 0x0000ff,
            spawnPoints: [
                {
                    position: { x: 65, y: 2, z: -21 },
                    rotation: { x: 0, y: THREE.Math.degToRad(-90), z: 0 },
                    velocity: { x: -50, y: 0, z: 0 }
                },
                {
                    position: { x: 65, y: 2, z: 21 },
                    rotation: { x: 0, y: THREE.Math.degToRad(-90), z: 0 },
                    velocity: { x: -50, y: 0, z: 0 }
                }
            ]
        }
    ];

    TestWorld.NUM_AVAILABLE_CARS = 20;

    TestWorld.INACTIVE_CAR_VELOCITY = 1;

    TestWorld.prototype.progress = function (asset) {
        console.log('TestWorld progress', arguments);
    };

    TestWorld.prototype.ready = function () {

        this.game.scene.addEventListener('update', this.onUpdate);

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
        this.parkingSpots.mesh.position.z = -10.5;
        this.add(this.parkingSpots);

        var parkingSpots = new ParkingSpots();
        parkingSpots.mesh.position.z = 10.5;
        this.add(parkingSpots);

        this.players.forEach(function (player) {
            player.spawnCar(this.assets.mustangWheel.data, this);
            this.numCarsSpawned = this.numCarsSpawned + 1;
        }, this);
    };

    TestWorld.prototype.onUpdate = function () {
        var player;
        var velocity;
        var i = 0;
        var l = this.players.length;
        for (; i !== l; i++) {
            player = this.players[i];
            velocity = player.cars[0].mesh.mesh.getLinearVelocity();
            if (
                Math.abs(velocity.x) < TestWorld.INACTIVE_CAR_VELOCITY &&
                Math.abs(velocity.y) < TestWorld.INACTIVE_CAR_VELOCITY &&
                Math.abs(velocity.z) < TestWorld.INACTIVE_CAR_VELOCITY
            ) {
                player.cars[0].disableControl();
                player.spawnCar(this.assets.mustangWheel.data, this);
                this.numCarsSpawned = this.numCarsSpawned + 1;
            }
        }
    };


    return TestWorld;
});