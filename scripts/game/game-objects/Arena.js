define([
    'game/game-objects/GameObjectBase'
], function (
    GameObjectBase
) {
    "use strict";

    var Arena = function () {
        GameObjectBase.call(this);

        this.width = 150;

        this.depth = this.width;

        this.material = Physijs.createMaterial(
            new THREE.MeshLambertMaterial({
                color: 0xffffff,
                specular:0xffffff,
                shininess: 10,
                map: THREE.ImageUtils.loadTexture('textures/cobblestone.jpg'),
                combine: THREE.MixOperation,
                reflectivity: 0.05
            }),
            0.1, // low friction
            3.4 // high restitution
        );
        this.material.map.wrapS = this.material.map.wrapT = THREE.RepeatWrapping;
        this.material.map.repeat.set(6, 6);

        this.geometry = new THREE.PlaneGeometry( this.width, this.depth, 100, 100 );
        this.geometry.computeFaceNormals();
        this.geometry.computeVertexNormals();

        this.mesh = new Physijs.HeightfieldMesh(
            this.geometry,
            this.material,
            0 // mass
        );
        this.mesh.rotation.x = THREE.Math.degToRad(-90);
        this.mesh.receiveShadow = true;

    };
    Arena.prototype = new GameObjectBase();
    Arena.prototype.constructor = Arena;

    Arena.prototype.add = function () {};


    return Arena;
});