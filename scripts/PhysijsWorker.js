define([
], function () {
    'use strict';

    // Client-side: Use native Worker class
    if (typeof Worker !== 'undefined') {
        Worker.prototype.transferableMessage = Worker.prototype.webkitPostMessage || Worker.prototype.postMessage;
        return Worker;
    }

    function PhysijsWorker (task) {

        this.onmessage = function () {};

        this.worker = require(task);

    };

    PhysijsWorker.prototype.postMessage = function (message) {
        this.worker.onmessage({ data: message });
    };

    PhysijsWorker.prototype.transferableMessage = PhysijsWorker.prototype.postMessage;

    return PhysijsWorker;
});