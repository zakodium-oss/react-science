import react from 'eslint-config-zakodium/react';
import ts from 'eslint-config-zakodium/ts';
import unicorn from 'eslint-config-zakodium/unicorn';
import storybook from 'eslint-plugin-storybook';

export default [
  {
    ignores: [
      '.storybook',
      'build',
      'coverage',
      'dist',
      'lib',
      'node_modules',
      'storybook-static',
      'playwright/.cache',
      'playwright-report*',
    ],
  },
  ...ts,
  ...react,
  ...unicorn,
  ...storybook.configs['flat/recommended'],
  {
    rules: {
      'react/no-unknown-property': ['error', { ignore: ['css'] }],
      '@typescript-eslint/no-dynamic-delete': 'off',
    },
  },
  {
    files: ['**/*.stories.*', 'tests/**'],
    rules: {
      '@typescript-eslint/unbound-method': 'off',
    },
  },
];
