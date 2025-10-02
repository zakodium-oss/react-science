import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../{src,stories}/**/*.stories.@(js|jsx|ts|tsx)'],
  core: {
    disableTelemetry: true,
  },
  framework: {
    name: '@storybook/react-vite',
    options: {
      strictMode: false,
    },
  },
  addons: ['@storybook/addon-docs'],
};

export default config;
