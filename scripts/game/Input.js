define([
    'lib/Util'
], function (
    Util
) {
    "use strict";

    function Input () {

        this._keysDown = [];

        this._onKeyDown = this._onKeyDown.bind(this);

        this._onKeyUp = this._onKeyUp.bind(this);

        _init.call(this);
    };

    Input.prototype._onKeyDown = function (e) {
        if (!this.isKeyDown(e.keyCode)) {
            this._keysDown.push(e.keyCode);
        }
    };

    Input.prototype._onKeyUp = function (e) {
        var indexToRemove = this._keysDown.indexOf(e.keyCode);
        if (indexToRemove !== -1) {
            this._keysDown.splice(indexToRemove, 1);
        }
    };

    Input.KEYS = {
        W: 87,
        A: 65,
        S: 83,
        D: 68
    };

    var _init = function () {
        this.enable();
    };

    Input.prototype.enable = function () {
        window.addEventListener('keydown', this._onKeyDown);
        window.addEventListener('keyup', this._onKeyUp);
    };

    Input.prototype.isKeyDown = function (keyCode) {
        return this._keysDown.indexOf(keyCode) !== -1;
    };

    return Input;
});