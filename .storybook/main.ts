import type { StorybookViteConfig } from '@storybook/builder-vite';

const config: StorybookViteConfig = {
  core: {
    builder: '@storybook/builder-vite',
  },
  stories: ['../stories/**/*.stories.tsx'],
  staticDirs: [],
  addons: ['@storybook/addon-essentials', '@storybook/addon-storysource'],
  async viteFinal(config, options) {
    const base = process.env.VITE_BASE || '/';
    config.base = base + 'storybook/';
    return config;
  },
};

export default config;
