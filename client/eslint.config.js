import globals from 'globals';
import js from '@eslint/js';
import babelParser from '@babel/eslint-parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import unusedImports from 'eslint-plugin-unused-imports';
import prettierConfig from 'eslint-config-prettier';

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
                babelOptions: {
                    presets: ['@babel/preset-react'],
                },
                // This is still needed for eslint-plugin-react to detect JSX
                ecmaFeatures: {jsx: true},
            },
            globals: {
                ...globals.browser,
                ...globals.mocha, // includes describe, it, before, after, beforeEach, afterEach
                cy: true,
                Package: true, // From old config
                Assets: true, // From old config
            },
        },
        settings: {
            react: {
                version: 'detect', // Automatically detect the React version
            },
        },
        plugins: {
            react: reactPlugin,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            'unused-imports': unusedImports,
        },
        rules: {
            // React-specific rules
            ...reactPlugin.configs.recommended.rules,
            'react/react-in-jsx-scope': 'off', // Not needed for React 17+
            'react/prop-types': 'off', // Disable prop-types rule if you're not using them
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': 'warn',

            // Unused imports/vars rules
            'no-unused-vars': 'off', // Replaced by unused-imports/no-unused-vars
            'unused-imports/no-unused-imports': 'error',

            // Non-stylistic rules for code quality
            'no-var': 'error',
            'no-new-object': 'error',
            'object-shorthand': 'error',
            'no-alert': 'error',
        },
    },

    // 3. Prettier config to disable conflicting rules
    // This must be the LAST item in the array.
    prettierConfig,
];
