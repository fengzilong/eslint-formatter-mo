const path = require( 'path' )
const chalk = require( 'chalk' )
const plur = require( 'plur' )
const stringWidth = require( 'string-width' )
const { locate } = require( './locator' )

module.exports = function ( results ) {
  let totalErrorCount = 0
  let totalWarningCount = 0

  const lines = []
  results
    .forEach( result => {
      const {
        filePath,
        source,
        output,
        errorCount,
        warningCount,
        messages = []
      } = result

      totalErrorCount = totalErrorCount + errorCount
      totalWarningCount = totalWarningCount + warningCount

      const errorSummary = errorCount > 0 ?
        chalk.red.bold( errorCount + ' ' + plur( 'error', errorCount ) ) :
        ''
      const warningSummary = warningCount > 0 ?
        chalk.yellow.bold(
          `${ warningCount } ${ plur( 'warning', warningCount ) }`
        ) :
        ''

      const relativePath = path.relative( '.', filePath )
      const basename = path.basename( relativePath )
      const dirname = path.dirname( relativePath ) + path.sep
      let header = '\n ' + chalk.dim( dirname ) + chalk.dim.bold( basename ) +
      ` 🔥${ errorCount > 0 ? ' ' : '' }` +
      [ errorSummary, warningSummary ].join( ' ' ) +
      `🔥\n`

      const divider = chalk.dim( '-'.repeat( stringWidth( header ) ) )
      header = divider + header + divider

      lines.push( header )

      const locations = messages.map( m => {
        let { message } = m

        message = message.replace(
          /\B`(.*?)`\B|\B'(.*?)'\B/g,
          ( m, p1, p2 ) => chalk.bold( p1 || p2 )
        )
        message = message.replace( /\s+$/, '' )

        const severity = ( m.fatal || m.severity === 2 || m.severity === 'error' ) ?
          'error' :
          'warning'
        const line = Number( m.line || 0 )
        const column = Number( m.column || 0 )

        return {
          severity,
          message,
          line,
          column,
        }
      } )

      if ( source || output ) {
        try {
          const codeframe = locate( source || output, locations )
          lines.push( codeframe )
        } catch ( e ) {
          console.log( e )
        }
      }
    } )

  if ( totalErrorCount + totalWarningCount > 0 ) {
    return '\n' + lines.join( '\n' )
  }

  return ''
}
