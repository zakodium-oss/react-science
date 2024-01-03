import config from './playwright-base.config.mjs';

config.testDir = './tests/app/';
config.webServer = {
  command: 'npm run dev-app',
  port: 5173,
  reuseExistingServer: true,
};
config.reporter = process.env.CI
  ? 'html'
  : [['html', { outputFolder: 'playwright-report-e2e' }]];

// eslint-disable-next-line unicorn/prefer-export-from
export default config;
