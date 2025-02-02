self.__uv$config = {
    prefix: '/ixl/bw/',
    bare:'/b/',
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: '/ixl/uv/uv.handler.js',
    bundle: '/ixl/uv/uv.bundle.js',
    config: '/ixl/uv/uv.config.js',
    sw: '/ixl/uv/uv.sw.js',
};
