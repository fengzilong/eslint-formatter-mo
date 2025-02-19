const map = {
  '.ts': 'ts',
  '.mts': 'ts',
  '.cts': 'ts',
  '.tsx': 'tsx',
  '.jsx': 'tsx',
  '.json': 'json',
  '.jsonc': 'jsonc',
  '.json5': 'json5',
  '.md': 'markdown',
  '.css': 'css',
}

const FALLBACK_LANGUAGE = 'javascript'

function getLanguageFromExt(ext) {
  const language = map[ext]

  if (typeof language === 'string') {
    return language
  }

  return FALLBACK_LANGUAGE
}

export {
  getLanguageFromExt,
}