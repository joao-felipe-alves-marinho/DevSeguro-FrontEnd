import js from '@eslint/js';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import tseslint from '@typescript-eslint/eslint-plugin';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import pluginRouter from '@tanstack/eslint-plugin-router';
import pluginQuery from '@tanstack/eslint-plugin-query';

export default [
  ...pluginRouter.configs['flat/recommended'],
  ...pluginQuery.configs['flat/recommended'],
  { ignores: ['dist'] },
  {
    settings: { react: { version: 'detect' } },
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': tseslint,
    },
    rules: {
      // core indent rule (2 spaces)
      'indent': ['error', 2],                                // ← use this instead :contentReference[oaicite:1]{index=1}
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // plus all your other recommended rules…
      ...reactHooks.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
    },
  },
];
