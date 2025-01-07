import eslint from '@eslint/js';
import pluginImportX from 'eslint-plugin-import-x'
import globals from 'globals'
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default [
  {
    ignores: [
      '*.config.*',
      '**/dist/**',
    ],
  },
  eslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
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
  }
]
