import eslint from '@eslint/js'
import json from '@eslint/json'
import markdown from '@eslint/markdown'
import css from '@eslint/css'
import pluginImportX from 'eslint-plugin-import-x'
import globals from 'globals'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

export default [
  {
    ignores: [
      '*.config.*',
      '**/dist/**',
    ],
  },

  // for JSON
  {
    plugins: {
      json,
    },
  },
  // lint JSON files
	{
		files: ['**/*.json'],
		ignores: ['package-lock.json'],
		language: 'json/json',
		...json.configs.recommended,
	},
	// lint JSONC files
	{
		files: ['**/*.jsonc'],
		language: 'json/jsonc',
		...json.configs.recommended,
	},
	// lint JSON5 files
	{
		files: ['**/*.json5'],
		language: 'json/json5',
		...json.configs.recommended,
	},

  // for markdown
  {
    files: ['**/*.md'],
    plugins: {
      markdown
    },
    language: 'markdown/gfm',
    rules: {
      'markdown/no-duplicate-headings': 'error',
      'markdown/heading-increment': 'error',
    },
  },

  // for CSS
  {
    files: ['**/*.css'],
    plugins: {
      css,
    },
    language: 'css/css',
    rules: {
      'css/no-empty-blocks': 'error',
      'css/no-invalid-properties': 'error',
    },
  },
  
  {
    files: ['**/*.mjs', '**/*.cjs', '**/*.js', '**/*.jsx', '**/*.mts', '**/*.ts', '**/*.tsx'],
    ...eslint.configs.recommended,
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021,
      }
    },
    plugins: {
      'import-x': pluginImportX,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      'no-magic-numbers': 'off',
      'no-duplicate-imports': 'off',
      'import-x/no-duplicates': 'error',
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
    },
  },
]
