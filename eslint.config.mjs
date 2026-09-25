import { defineConfig, globalIgnores } from 'eslint/config';
import react from 'eslint-config-zakodium/react';
import ts from 'eslint-config-zakodium/ts';
import unicorn from 'eslint-config-zakodium/unicorn';
import * as storybook from 'eslint-plugin-storybook';

export default defineConfig(
  globalIgnores([
    '.storybook',
    'build',
    'coverage',
    'dist',
    'lib',
    'node_modules',
    'storybook-static',
    'playwright/.cache',
    'playwright-report*',
  ]),
  ts,
  unicorn,
  react,
  storybook.configs['flat/recommended'],
  {
    rules: {
      '@typescript-eslint/no-dynamic-delete': 'off',
      'react-refresh/only-export-components': [
        'error',
        { extraHOCs: ['styled', 'withFieldGroup'] },
      ],
    },
  },
  {
    files: ['**/*.stories.*'],
    rules: {
      '@eslint-react/rules-of-hooks': 'off',
    },
  },
  {
    files: ['**/*.stories.*', 'tests/**'],
    rules: {
      '@typescript-eslint/unbound-method': 'off',
    },
  },
);
