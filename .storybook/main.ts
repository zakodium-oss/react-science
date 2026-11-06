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
  addons: [
    {
      name: 'addon-storybook-sync',
      options: {
        port:
          Number(process.env.WEBSTORM_ADDON_STORYBOOK_SYNC_PORT) || undefined,
      },
    },
    '@storybook/addon-docs',
  ],
};

export default config;
