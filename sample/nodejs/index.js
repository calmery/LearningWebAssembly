const fs = require( 'fs' )

const toUint8Array = buf  => {
	let u = new Uint8Array( buf.length )
	for( let i=0; i<buf.length; i++ )
		u[i] = buf[i]
  	return u
}

const buffer = fs.readFileSync( './sample.cpp.wasm' )
const lib = Wasm.instantiateModule( toUint8Array( buffer ) ).exports

console.log( lib.fib( 10 ) )