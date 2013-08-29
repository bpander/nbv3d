window.SETTINGS = {};

SETTINGS.GAME_SERVER_ADDRESS = 'http://192.168.1.133';

var config = function (requirejs) {
    requirejs.config({

        paths: {
            'three': 'vendor/three.min',
            'physijs': 'vendor/physi',
            'socket.io': 'vendor/socket.io-client/socket.io',
            'jquery': 'vendor/jquery-2.0.3.min'
        },

        shim: {
            'physijs': ['three']
        },

        deps: [
            'settings'
        ]

    });
};

if (typeof module === 'undefined') {
    config(requirejs);
} else {
    module.exports = config;
}