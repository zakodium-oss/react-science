import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: 'tests',
  retries: 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    headless: true,
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
