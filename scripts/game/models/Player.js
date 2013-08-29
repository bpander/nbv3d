define([
    'game/models/SpawnPoint',
    'game/game-objects/Car'
], function (
    SpawnPoint,
    Car
) {
    'use strict';

    function Player (json) {

        this.body = 0xffffff;

        this.wheel = null;

        this.cars = [];

        this.spawnPoints = [];

        if (json instanceof Object) {
            this.convertFromJson(json);
        }
    };

    Player.prototype.convertFromJson = function (json) {
        this.body = json.body || this.body;
        if (json.spawnPoints instanceof Array) {
            this.spawnPoints = json.spawnPoints.map(function (spawnPointJson) {
                return new SpawnPoint(spawnPointJson);
            }, this);
        }
        return this;
    };

    Player.prototype.spawnCar = function (wheel, environment) {
        var spawnPoint = this.spawnPoints[Math.floor(Math.random() * this.spawnPoints.length)];
        var car = new Car(this.body, wheel);
        car.mesh.mesh.position.copy(spawnPoint.position);
        car.mesh.mesh.rotation.copy(spawnPoint.rotation);
        environment.add(car);
        car.mesh.mesh.setLinearVelocity(spawnPoint.velocity);
        car.enableControl();
        this.cars.unshift(car);
        return car;
    };

    return Player;
});