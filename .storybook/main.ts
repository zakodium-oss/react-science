import type { StorybookViteConfig } from '@storybook/builder-vite';
import { mergeConfig, splitVendorChunkPlugin, UserConfig } from 'vite';

import { sharedConfig } from '../vite.config';

const config: StorybookViteConfig = {
  core: {
    builder: '@storybook/builder-vite',
  },
  stories: ['../stories/**/*.stories.tsx'],
  staticDirs: [],
  addons: ['@storybook/addon-essentials', '@storybook/addon-storysource'],
  async viteFinal(baseConfig) {
    const config: UserConfig = {
      ...sharedConfig,
      base: sharedConfig.base + 'storybook/',
      plugins: [splitVendorChunkPlugin()],
    };
    return mergeConfig(baseConfig, config);
  },
};

export default config;
