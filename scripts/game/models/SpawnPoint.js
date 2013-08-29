define([
    'three'
], function (
) {
    'use strict';

    function SpawnPoint (json) {

        this.position = null;

        this.rotation = null;

        this.velocity = null;

        if (json instanceof Object) {
            this.convertFromJson(json);
        }
    };

    SpawnPoint.prototype.convertFromJson = function (json) {
        this.position = json.position instanceof Object ? new THREE.Vector3(json.position.x, json.position.y, json.position.z) : this.position;
        this.rotation = json.rotation instanceof Object ? new THREE.Vector3(json.rotation.x, json.rotation.y, json.rotation.z) : this.rotation;
        this.velocity = json.velocity instanceof Object ? new THREE.Vector3(json.velocity.x, json.velocity.y, json.velocity.z) : this.velocity;
        return this;
    };

    return SpawnPoint;
});