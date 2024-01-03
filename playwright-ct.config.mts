import { defineConfig } from '@playwright/experimental-ct-react';

import config from './playwright-base.config.mjs';

config.testDir = './tests/components/';
config.reporter = process.env.CI
  ? 'html'
  : [['html', { outputFolder: 'playwright-report-ct' }]];
export default defineConfig(config);
