define([
    'lib/Util'
], function (
    Util
) {
    "use strict";

    var Input = {};

    var _keysDown = [];

    var _events = {

        onKeyDown: function (e) {
            if (!this.isKeyDown(e.keyCode)) {
                _keysDown.push(e.keyCode);
            }
        },

        onKeyUp: function (e) {
            var indexToRemove = _keysDown.indexOf(e.keyCode);
            if (indexToRemove !== -1) {
                _keysDown.splice(indexToRemove, 1);
            }
        },

        onFirstMouseMove: function (e) {
            // We need to get the initial x and y position of the mouse
            this.mouse.x = e.x;
            this.mouse.y = e.y;
            window.removeEventListener('mousemove', _events.onFirstMouseMove);
            window.addEventListener('mousemove', _events.onMouseMove);
        },

        onMouseMove: function (e) {
            this.mouse.isDirty = true;
            this.mouse.movementX = e.movementX || e.webkitMovementX || e.mozMovementX || 0;
            this.mouse.movementY = e.movementX || e.webkitMovementY || e.mozMovementY || 0;
        }
    };

    Input.KEYS = {
        W: 87,
        A: 65,
        S: 83,
        D: 68
    };

    Input.mouse = {
        movementX: -1,
        movementY: -1,
        isDirty: true
    };

    Input.init = function () {
        Util.bindAll(_events, this);
        this.bindEvents();
    };

    Input.bindEvents = function () {
        window.addEventListener('keydown', _events.onKeyDown);
        window.addEventListener('keyup', _events.onKeyUp);
        window.addEventListener('mousemove', _events.onFirstMouseMove);
    };

    Input.isKeyDown = function (keyCode) {
        return _keysDown.indexOf(keyCode) !== -1;
    };

    /**
     * Wipe out the last mouse movement if the movement is dirty
     */
    Input.update = function () {
        if (this.mouse.isDirty) {
            this.mouse.movementY = 0;
            this.mouse.movementX = 0;
            this.mouse.isDirty = false;
        }
    };

    return Input;
});