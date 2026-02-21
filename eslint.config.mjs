import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import reactNative from 'eslint-plugin-react-native'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
  // Ignore generated/platform folders
  {
    ignores: ['node_modules/**', 'android/**', 'ios/**', 'build/**', 'dist/**'],
  },

  // Base JS recommendations
  js.configs.recommended,

  // TypeScript recommendations (flat)
  ...tseslint.configs.recommended,

  // React recommendations (flat)
  pluginReact.configs.flat['recommended'],

  // Project rules
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        __DEV__: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      'react-hooks': pluginReactHooks,
      'react-native': reactNative,
    },
    rules: {
      // React Native (eslint-plugin-react-native)
      'react-native/no-unused-styles': 'error',
      'react-native/split-platform-components': 'error',
      'react-native/no-inline-styles': 'warn',
      'react-native/no-color-literals': 'warn',
      'react-native/no-single-element-style-arrays': 'error',

      // React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'off',

      // React
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/display-name': 'off',

      // General
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-unused-vars': 'off',
      'prefer-const': 'error',
      'no-var': 'error',
      'no-duplicate-imports': 'error',
      'max-lines': ['warn', { max: 300, skipBlankLines: true }],
    },
    settings: {
      react: { version: 'detect' },
    },
  },
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
]
