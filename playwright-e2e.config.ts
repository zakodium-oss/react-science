import config from './playwright-base.config';

config.testDir = './tests/app/';
config.webServer = {
  command: 'npm run dev-app',
  port: 3000,
  reuseExistingServer: true,
};

export default config;
