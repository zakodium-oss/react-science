import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  core: {},
  framework: {
    name: '@storybook/react-vite',
    options: {
      strictMode: false,
    },
  },
  addons: ['@storybook/addon-docs'],
};

export default config;
