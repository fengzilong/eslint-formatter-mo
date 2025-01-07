import { createHighlighterCore } from 'shiki/core'
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'
import javascript from '@shikijs/langs/javascript'
import ts from '@shikijs/langs/ts'
import tsx from '@shikijs/langs/tsx'
import chalk from 'chalk'

async function createHighlight(theme) {
  const highlighter = await createHighlighterCore({
    themes: [],
    langs: [
      javascript,
      ts,
      tsx,
    ],
    engine: createOnigurumaEngine(import('shiki/wasm'))
  })

  return function highlight(languageId, source) {
    const lines = highlighter.codeToTokensBase(source, {
      lang: languageId ?? 'javascript',
      theme,
    })

    return lines.map(line => {
      return line.map(token => chalk.hex(token.color).visible(token.content)).join('')
    }).join('\n')
  }
}

export {
  createHighlight
}