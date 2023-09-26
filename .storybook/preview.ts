import type { Preview } from '@storybook/react';
import { RootLayoutDecorator } from '../stories/utils';

import '../styles/storybook-globals.css';
import '../styles/preflight.css';

const preview: Preview = {
  decorators: [RootLayoutDecorator],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
