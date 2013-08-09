var require = {

    paths: {
        'three': 'lib-thirdparty/three.min',
        'physijs': 'lib-thirdparty/physi'
    },

    shim: {
        'physijs': ['three']
    }

};