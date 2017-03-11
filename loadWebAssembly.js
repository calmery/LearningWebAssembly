( self => {
    
    const loadWebAssembly = ( src, env ) => {
        const compile = buffer => WebAssembly.compile( buffer )
        
        const getInstance = m => {
            let imports = {}
            imports.env = env || {}
            imports.env.memoryBase = env.memoryBase || 0
            imports.env.tableBase = env.tableBase || 0

            if( !imports.env.memory )
                imports.env.memory = new WebAssembly.Memory( {
                    initial: 256
                } )

            if( !imports.env.table )
                imports.env.table = new WebAssembly.Table( {
                    initial: 0,
                    element: 'anyfunc'
                } )

            const instance = new WebAssembly.Instance( m, imports )
            return instance
        }

        const getArrayBuffer = src => {
            if( typeof module !== 'undefined' && typeof module.exports !== 'undefined' && exports !== undefined ){
                const buffer = require( 'fs' ).readFileSync( src )
                const arrayBuffer = new Promise( ( resolve, reject ) => {
                    resolve( new Uint8Array( buffer ).buffer )
                } )
                return arrayBuffer
            } else {
                return fetch( src ).then( response => response.arrayBuffer() )
            }
        }
        
        return getArrayBuffer( src ).then( compile ).then( getInstance )
    }
    
    self.loadWebAssembly = loadWebAssembly
    
} )( typeof exports === 'undefined' ? this : module.exports )