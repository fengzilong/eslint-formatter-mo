const path = require( 'path' )
const fs = require( 'fs' )
const babel = require( 'babel' )

const content = fs.readFileSync( 'index.md', 'utf8' )
console.log( content )

const { level } = this

// Parsing error
function test() {
  import( './a' ).then( () => {} )
}
