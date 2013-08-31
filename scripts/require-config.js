var config = function (requirejs) {
    requirejs.config({

        baseUrl: 'scripts',

        paths: {
            'THREE': 'vendor/three.min',
            'Physijs': 'vendor/physi',
            'socket.io-client': 'vendor/socket.io-client/socket.io'
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