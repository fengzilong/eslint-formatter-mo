import getRuleDocs from 'eslint-rule-docs'

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

// getRuleUrl credits to eslint-formatter-pretty
function getRuleUrl(ruleId, data) {
	try {
		return data.rulesMeta[ruleId].docs.url;
	} catch {
		try {
			return getRuleDocs(ruleId).url;
		} catch {
			return undefined;
		}
	}
}

export {
  getLanguageFromExt,
  getRuleUrl,
}