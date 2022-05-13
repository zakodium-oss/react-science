import type { StorybookViteConfig } from '@storybook/builder-vite';

const config: StorybookViteConfig = {
  core: {
    builder: '@storybook/builder-vite',
  },
  stories: ['../stories/**/*.stories.tsx'],
  staticDirs: [],
  addons: ['@storybook/addon-essentials', '@storybook/addon-storysource'],
  async viteFinal(config, options) {
    config.base = '/storybook/';
    return config;
  },
};

export default config;
