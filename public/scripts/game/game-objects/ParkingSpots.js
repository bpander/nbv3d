define([
], function (
) {
    "use strict";

    var ParkingSpots = function () {

        this.width = 36;

        this.depth = 14;

        this.geometry = new THREE.PlaneGeometry(this.width, this.depth);
        this.geometry.computeFaceNormals();
        this.geometry.computeVertexNormals();

        this.material = new THREE.MeshLambertMaterial({
            transparent: true,
            opacity: 0.66,
            blending: THREE.AdditiveBlending,
            map: THREE.ImageUtils.loadTexture('textures/parking-spots.png')
        });

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.rotation.x = THREE.Math.degToRad(-90);
        this.mesh.receiveShadow = true;
    };

    ParkingSpots.prototype.add = function () {};


    return ParkingSpots;
});