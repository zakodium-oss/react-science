import type { StorybookConfig } from '@storybook/react-vite';
const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  core: {},
  addons: ['@storybook/addon-essentials', '@storybook/addon-storysource'],
  framework: {
    name: '@storybook/react-vite',
    options: {
      strictMode: false,
    },
  },
  docs: {
    autodocs: 'tag',
  },
};
export default config;
