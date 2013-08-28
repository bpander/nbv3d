var require = {

    paths: {
        'three': 'vendor/three.min',
        'physijs': 'vendor/physi',
        'socket.io': 'vendor/socket.io-client/socket.io',
        'jquery': 'vendor/jquery-2.0.3.min'
    },

    shim: {
        'physijs': ['three']
    }

};