import config from './playwright-base.config';

config.testDir = './tests/app/';
config.webServer = {
  command: 'npm run dev-app',
  port: 5173,
  reuseExistingServer: true,
};

export default config;
