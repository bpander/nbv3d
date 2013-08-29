var config = function (requirejs) {
    requirejs.config({

        baseUrl: 'scripts',

        paths: {
            'three': 'vendor/three.min',
            'physijs': 'vendor/physi',
            'socket.io-client': 'vendor/socket.io-client/socket.io',
            'jquery': 'vendor/jquery-2.0.3.min'
        },

        shim: {
            'physijs': ['three']
        }

    });

    var ROUTES = {
        CLIENT: 'main.client',
        SERVER: 'main.server'
    };
    requirejs([typeof document === 'undefined' ? ROUTES.SERVER : ROUTES.CLIENT]);
};

if (typeof module === 'undefined') {
    config(requirejs);
} else {
    module.exports = config;
}