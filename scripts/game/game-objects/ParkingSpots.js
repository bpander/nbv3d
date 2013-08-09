define([
], function (
) {
    "use strict";

    var ParkingSpots = function () {

        this.width = 60;

        this.depth = 25;

        this.geometry = new THREE.PlaneGeometry(this.width, this.depth);
        this.geometry.computeFaceNormals();
        this.geometry.computeVertexNormals();

        this.material = new THREE.MeshLambertMaterial({
            transparent: true,
            opacity: 0.75,
            blending: THREE.AdditiveBlending,
            map: THREE.ImageUtils.loadTexture('textures/parking-spots.png')
        });

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.rotation.x = THREE.Math.degToRad(-90);
        this.mesh.receiveShadow = true;

    };

    ParkingSpots.prototype.update = function () {
    };


    return ParkingSpots;
});