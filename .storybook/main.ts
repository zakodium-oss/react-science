import type { StorybookViteConfig } from '@storybook/builder-vite';
import { mergeConfig, UserConfig } from 'vite';

const config: StorybookViteConfig = {
  core: {
    builder: '@storybook/builder-vite',
  },
  stories: ['../stories/**/*.stories.tsx'],
  staticDirs: [],
  addons: ['@storybook/addon-essentials', '@storybook/addon-storysource'],
  async viteFinal(baseConfig, options) {
    const base = process.env.VITE_BASE || '/';
    const config: UserConfig = {
      base: base + 'storybook/',
      esbuild: {
        jsx: 'automatic',
      },
    };
    return mergeConfig(baseConfig, config);
  },
};

export default config;
