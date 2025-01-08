import path from 'node:path'

import chalk from 'chalk'
import { cristal,fruit } from 'gradient-string'
import plur from 'plur'
import stringWidth from 'string-width'
import link from 'terminal-link'

import { createHighlight } from './highlight.js'
import { locate } from './locator.js'
import { getLanguageFromExt } from './utils.js'

function createFormatter( theme ) {
  return async function formatter( results ) {
    // create highlight in advance to reuse it later
    const highlight = await createHighlight( theme )

    let totalErrorCount = 0
    let totalWarningCount = 0
    let autoFixableCount = 0

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

        if ( errorCount + warningCount === 0 ) {
          return
        }

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
        const formattedPath = chalk.dim( dirname ) + chalk.dim.bold( basename )
        let header = '\n ' + link( formattedPath, `file://${ filePath }`, {
          fallback: () => formattedPath
        } ) +
        ` 🔥${ errorCount > 0 ? ' ' : '' }` +
        [ errorSummary, warningSummary ].join( ' ' ) +
        `🔥\n`

        const divider = chalk.dim( '─'.repeat( stringWidth( header ) ) )
        header = divider + header + divider

        lines.push( header )

        const locations = messages.map( m => {
          let { message } = m

          message = message.replace(
            /\B`(.*?)`\B|\B'(.*?)'\B/g,
            ( m, p1, p2 ) => chalk.bold( p1 || p2 )
          )
          message = message.replace( /\s+$/, '' )

          if ( m.fix ) {
            autoFixableCount = autoFixableCount + 1
          }

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
            fixable: Boolean( m.fix ),
            ruleId: m.ruleId,
          }
        } )

        // Parsing error(e.g. using ts rules but missing tsconfig.json)
        if (
          locations.length === 1 &&
          locations[ 0 ].line === 0 &&
          locations[ 0 ].column === 0
        ) {
          lines.push( `${ chalk.red( '✖' ) } ${ locations[ 0 ].message }` )
        } else if ( source || output ) {
          try {
            const ext = path.extname(filePath)
            const codeframe = locate( source || output, locations, highlight.bind(null, getLanguageFromExt(ext)) )
            lines.push( codeframe )
          } catch ( e ) {
            console.log( e )
          }
        }
      } )

    if ( totalErrorCount + totalWarningCount > 0 ) {
      const totalErrorMessage = chalk.redBright( ` ${ chalk.bold( totalErrorCount ) } ${ plur( 'error', totalErrorCount ) }` )
      const totalWarningMessage = chalk.yellowBright( ` ${ chalk.bold( totalWarningCount ) } ${ plur( 'warning', totalWarningCount ) }` )
      const totalFixableMessage = chalk.greenBright( ` ${ chalk.bold( autoFixableCount ) } ${ plur( 'auto-fixable', autoFixableCount ) } ( with the \`--fix\` flag )` )
      const maxLen = stringWidth( totalFixableMessage ) + 1
      return `\n${ lines.join( '\n' ) }\n` +
        `${ fruit( `─`.repeat( maxLen ) ) }\n` +
        `${ totalErrorMessage }\n${ totalWarningMessage }\n${ totalFixableMessage }\n` +
        `${ cristal( `─`.repeat( maxLen ) ) }\n`
    }

    return ''
  }
}

export { createFormatter }