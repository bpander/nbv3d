var require = {

    paths: {
        'three': 'lib-thirdparty/three.min',
        'physijs': 'lib-thirdparty/physi',
        'jquery': 'lib-thirdparty/jquery-2.0.3.min'
    },

    shim: {
        'physijs': ['three']
    }

};