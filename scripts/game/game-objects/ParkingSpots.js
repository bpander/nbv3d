define([
    'THREE'
], function (
    THREE
) {
    "use strict";

    var ParkingSpots = function () {

        this.width = 36;

        this.depth = 14;

        this.geometry = new THREE.PlaneGeometry(this.width, this.depth);
        this.geometry.computeFaceNormals();
        this.geometry.computeVertexNormals();

        // TODO: Clean this up
        var materialProperties = {
            transparent: true,
            opacity: 0.66,
            blending: THREE.AdditiveBlending
        };
        if (typeof window !== 'undefined') {
            materialProperties.map = THREE.ImageUtils.loadTexture('textures/parking-spots.png');
        }
        this.material = new THREE.MeshLambertMaterial(materialProperties);

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.rotation.x = THREE.Math.degToRad(-90);
        this.mesh.receiveShadow = true;
    };

    ParkingSpots.prototype.add = function () {};


    return ParkingSpots;
});