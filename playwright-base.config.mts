import { devices, PlaywrightTestConfig } from '@playwright/test';

import viteConfig from './vite.config.mjs';

const config: PlaywrightTestConfig = {
  forbidOnly: !!process.env.CI,
  retries: 1,
  use: {
    trace: 'on-first-retry',
    headless: true,
    ignoreHTTPSErrors: true,
    // video: 'on-first-retry',
    launchOptions: {
      // slowMo: 250,
    },
    contextOptions: {
      strictSelectors: true,
    },
    // @ts-expect-error not yet official
    ctViteConfig: viteConfig,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
  ],
};

export default config;
