import type { Preview } from '@storybook/react';
import { RootLayoutDecorator } from '../stories/utils.js';

import '../styles/storybook-globals.css';
import '../styles/preflight.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/select/lib/css/blueprint-select.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';

const preview: Preview = {
  decorators: [RootLayoutDecorator],
  parameters: {
    docs: {
      codePanel: true,
    },
    controls: {
      matchers: {
        color: /(fill|color|color$|stroke)/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
