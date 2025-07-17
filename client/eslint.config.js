import globals from 'globals';
import js from '@eslint/js';
import babelParser from '@babel/eslint-parser';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import unusedImports from 'eslint-plugin-unused-imports';

export default [
  // 1. Global ignores
  {
    ignores: ['dist/'],
  },

  // 2. Base recommended rules and project-specific configurations
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.mocha, // includes describe, it, before, after, beforeEach, afterEach
        cy: true,
        Package: true, // From old config
        Assets: true, // From old config
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'unused-imports': unusedImports,
    },
    rules: {
      // React-specific rules
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': 'warn',

      // Unused imports/vars rules
      'no-unused-vars': 'off', // Replaced by unused-imports/no-unused-vars
      'unused-imports/no-unused-imports': 'error',

      // Rules from the provided JSON config
      indent: ['error', 4, { SwitchCase: 1 }],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      'quote-props': ['error', 'as-needed'],
      semi: ['error', 'always'],
      'no-var': 'error',
      'no-new-object': 'error',
      'object-shorthand': 'error',
      'no-alert': 'error',
      'keyword-spacing': ['error', { before: true, after: true }],
      'semi-spacing': ['error', { before: false, after: true }],
      'space-before-function-paren': [
        'error',
        { anonymous: 'always', named: 'never' },
      ],
      'space-before-blocks': 'error',
      'object-curly-spacing': ['error', 'never'],
      'key-spacing': ['error', { afterColon: true, beforeColon: false }],
      'comma-spacing': ['error', { before: false, after: true }],
      curly: 'error',
      'space-infix-ops': 'error',
      'space-in-parens': ['error', 'never'],
    },
  },
];
