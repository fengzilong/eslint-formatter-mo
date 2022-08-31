const chalk = require( 'chalk' )
const emphasize = require( 'emphasize' )

function locate( source, locations ) {
  let lines = source.split( '\n' )

  const frameStart = 0
  let frameEnd = lines.length

  while ( !/\S/.test( lines[ lines.length - 1 ] ) ) {
    lines.pop()
    frameEnd = frameEnd - 1
  }

  const digits = String( frameEnd ).length + 1

  const formattedLines = emphasize.highlight( 'js', source, {
    keyword: chalk.magenta,
    built_in: chalk.cyan, // eslint-disable-line
    string: chalk.green,
    number: chalk.green,
    literal: chalk.green,
    'class': chalk.yellow, // eslint-disable-line
    'function': chalk.reset.white, // eslint-disable-line
    params: chalk.reset.white,
  } ).value.split( '\n' )

  return lines
    .map( ( str, i ) => {
      let lineNum = String( i + frameStart + 1 )
      while ( lineNum.length < digits ) {
        lineNum = ` ${ lineNum }`
      }

      if ( isErrorLine( frameStart + i + 1, locations ) ) {
        const ls = getErrorLocations( frameStart + i + 1, locations )
        let indicators = ls.map( l => {
          return {
            spaceLen: digits + 2 +
              tabsToSpaces( str.slice( 0, l.column - 1 ) ).length,
            content: spaces(
              digits + 2 +
              tabsToSpaces( str.slice( 0, l.column - 1 ) ).length
            ) + '└─ ',
            severity: l.severity,
            message: l.message,
            fixable: l.fixable,
            ruleId: l.ruleId,
          }
        } ).sort( ( a, b ) => {
          return a.spaceLen - b.spaceLen
        } )

        indicators = indicators.reduce( ( memo, indicator, index ) => {
          let char = '│'

          if ( index === indicators.length - 1 ) {
            char = '↑'
          }

          const sep = {
            ignore: true,
            content: spaces( indicator.content.length )
          }

          const insertIndexes = []
          memo.forEach( m => {
            if ( m.ignore ) {
              return
            }

            indicator.content = replaceAt( indicator.content, m.spaceLen, '│' )
            insertIndexes.push( m.spaceLen )
          } )

          insertIndexes.push( indicator.spaceLen )

          sep.content = sep.content.split( '' )
          insertIndexes.forEach( i => {
            sep.content[ i ] = char
          } )

          sep.content = sep.content.join( '' )
          sep.content = sep.content.replace( /\s+$/, '' )

          memo.push( indicator )
          memo.push( sep )

          return memo
        }, [] )

        indicators.reverse()

        indicators.push( {
          content: ''
        } )

        const lineNo = chalk.dim( lineNum + ':' )
        const indentation = tabsToSpaces( formattedLines[ i ] )
        const display = i => {
          if ( i.severity ) {
            const fixableMessage = i.fixable === true ?
              chalk.dim( ' ( auto-fixable )' ) :
              ''
            const ruleId = i.ruleId ? chalk.dim( ` [ ${ i.ruleId } ]` ) : ''
            return chalk.dim( i.content ) +
              `${ i.severity === 'warning' ? chalk.yellow.dim( '⚠' ) : chalk.red( '✖' ) } ` +
              chalk.dim( i.message ) + ruleId + fixableMessage
          }

          return chalk.dim( i.content )
        }

        return chalk.bgBlack( `${ lineNo } ${ indentation } ` ) +
          `\n${ indicators.map( display ).join( '\n' ) }`
      }

      return ''
    } )
    .reduce( ( memo, line ) => {
      if ( line !== '' ) {
        memo.push( line )
      } else if ( memo[ memo.length - 1 ] !== '' ) {
        memo.push( line )
      }

      return memo
    }, [] )
    .join( '\n' )
}

function spaces( i ) {
  let result = ''
  while ( i-- ) {
    result = result + ' '
  }
  return result
}

function tabsToSpaces( str ) {
  return str.replace( /^\t+/, match => match.split( '\t' ).join( '  ' ) )
}

function replaceAt( string, index, replacement ) {
  const array = string.split( '' )
  if ( array[ index ] === ' ' ) { // only replace for space
    array[ index ] = replacement
  }
  return array.join( '' )
}

function isErrorLine( line, locations = [] ) {
  return locations.some( l => l.line === line )
}

function getErrorLocations( line, locations ) {
  return locations.filter( l => l.line === line )
}

exports.locate = locate
