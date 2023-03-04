import { defineConfig } from '@playwright/experimental-ct-react';

import config from './playwright-base.config';

config.testDir = './tests/components/';

export default defineConfig(config);
