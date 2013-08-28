var require = {

    paths: {
        'three': 'lib-thirdparty/three.min',
        'physijs': 'lib-thirdparty/physi',
        'socket.io': 'lib-thirdparty/socket.io-client/socket.io',
        'jquery': 'lib-thirdparty/jquery-2.0.3.min'
    },

    shim: {
        'physijs': ['three']
    }

};