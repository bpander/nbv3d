define([
    'game/game-objects/GameObjectBase',
    'THREE',
    'Physijs'
], function (
    GameObjectBase,
    THREE,
    Physijs
) {
    "use strict";

    var Arena = function () {
        GameObjectBase.call(this);

        this.width = 150;

        this.depth = this.width;

        this.height = 1;

        // TODO: Clean this up
        var materialProperties = { color: 0xffffff };
        if (typeof window !== 'undefined') {
            materialProperties.map = THREE.ImageUtils.loadTexture('textures/cobblestone.jpg');
        }
        this.material = Physijs.createMaterial(
            new THREE.MeshLambertMaterial(materialProperties),
            0.1, // friction
            3.4  // restitution
        );
        if (this.material.map !== null) {
            this.material.map.wrapS = this.material.map.wrapT = THREE.RepeatWrapping;
            this.material.map.repeat.set(6, 6);
        }

        this.geometry = new THREE.CubeGeometry(this.width, this.height, this.depth);

        this.mesh = new Physijs.BoxMesh(
            this.geometry,
            this.material,
            0 // mass
        );
        this.mesh.position.y = -this.height / 2;
        this.mesh.receiveShadow = true;

        this.wallMaterial = new Physijs.createMaterial(new THREE.MeshLambertMaterial({ color: 0xff0000 }));
        this.wallDepth = 1;
        this.wallHeight = 5;
        _createWalls.call(this, false, false);
        _createWalls.call(this, false, true);
        _createWalls.call(this, true, true);
        _createWalls.call(this, true, false);
    };
    Arena.prototype = new GameObjectBase();
    Arena.prototype.constructor = Arena;

    Arena.WALLS = [
        {
            x: 16.25,
            z: 28,
            width: 32.5,
            rotation: 0
        },
        {
            x: 32,
            z: 26,
            width: 3.5,
            rotation: THREE.Math.degToRad(90)
        },
        {
            x: 52.5,
            z: 24.75,
            width: 40,
            rotation: 0
        },
        {
            x: 72.5,
            z: 20.75,
            width: 8,
            rotation: THREE.Math.degToRad(90)
        },
        {
            x: 52.5,
            z: 16.75,
            width: 40,
            rotation: 0
        },
        {
            x: 32,
            z: 13.5,
            width: 7.5,
            rotation: THREE.Math.degToRad(90)
        },
        {
            x: 35,
            z: 10.25,
            width: 5,
            rotation: 0
        },
        {
            x: 35,
            z: 3,
            width: 5,
            rotation: 0
        },
        {
            x: 38,
            z: 6.625,
            width: 8.375,
            rotation: THREE.Math.degToRad(90)
        },
        {
            x: 32,
            z: 1.75,
            width: 3.5,
            rotation: THREE.Math.degToRad(90)
        }
    ];

    var _createWalls = function (reflectX, reflectY) {
        var wall;
        var wallData;
        var walls = [];
        var i = Arena.WALLS.length;
        var yFactor = reflectY ? -1 : 1;
        var xFactor = reflectX ? -1 : 1;
        while (i--) {
            wallData = Arena.WALLS[i];
            wall = new Physijs.BoxMesh(
                new THREE.CubeGeometry(wallData.width, this.wallHeight, this.wallDepth),
                this.wallMaterial,
                0
            );
            wall.rotation.y = wallData.rotation;
            wall.position.set(wallData.x * xFactor, this.wallHeight / 2, wallData.z * yFactor);
            walls.push(wall);
            this.mesh.add(wall);
        }
        return walls;
    };

    Arena.prototype.add = function () {};


    return Arena;
});