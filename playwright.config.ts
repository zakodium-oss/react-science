import { PlaywrightTestConfig } from '@playwright/test';

type BrowserName = 'chromium' | 'firefox' | 'webkit';

const browserName = (process.env.BROWSER || 'chromium') as BrowserName;

const config: PlaywrightTestConfig = {
  testDir: 'tests',
  retries: 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    browserName,
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    // video: 'on-first-retry',
    launchOptions: {
      // slowMo: 250,
    },
    contextOptions: {
      strictSelectors: true,
    },
  },
  webServer: {
    command: 'npm run dev-app',
    port: 3000,
    reuseExistingServer: true,
  },
};

export default config;
