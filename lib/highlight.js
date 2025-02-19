import css from '@shikijs/langs/css'
import javascript from '@shikijs/langs/javascript'
import json from '@shikijs/langs/json'
import json5 from '@shikijs/langs/json5'
import jsonc from '@shikijs/langs/jsonc'
import markdown from '@shikijs/langs/markdown'
import ts from '@shikijs/langs/ts'
import tsx from '@shikijs/langs/tsx'
import chalk from 'chalk'
import { createHighlighterCore } from 'shiki/core'
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'

async function createHighlight( themeName ) {
  let theme
  try {
    theme = await import(`@shikijs/themes/${ themeName }`)
  } catch (e) {
    // if themeName cannot be resolved, use `one-dark-pro` as default theme
    theme = await import(`@shikijs/themes/one-dark-pro`)
  }

  const highlighter = await createHighlighterCore({
    themes: [
      theme,
    ],
    langs: [
      javascript,
      ts,
      tsx,
      json,
      jsonc,
      json5,
      markdown,
      css,
    ],
    engine: createOnigurumaEngine(import('shiki/wasm'))
  })

  return function highlight(languageId, source) {
    const lines = highlighter.codeToTokensBase(source, {
      lang: languageId ?? 'javascript',
      theme: theme.name,
    })

    return lines.map(line => {
      return line.map(token => chalk.hex(token.color).visible(token.content)).join('')
    }).join('\n')
  }
}

export {
  createHighlight
}