import { defineConfig } from '@playwright/experimental-ct-react';

import config from './playwright-base.config.mjs';

config.testDir = './tests/components/';

export default defineConfig(config);
