import type { Meta, StoryObj } from '@storybook/react';

import { MeasurementColorPreview } from '../../../src/app/index.js';
import { AppStateProvider } from '../../../src/app-data/index.js';

export default {
  title: 'Measurements / Color Preview',
  component: MeasurementColorPreview,
} as Meta;

type Story = StoryObj<typeof MeasurementColorPreview>;

export const ColorPreview = {
  args: {
    measurementId: '1',
    kind: 'ir',
    color: {
      kind: 'fixed',
      color: 'blue',
    },
  },
  decorators: (Story) => (
    <AppStateProvider>
      <Story />
    </AppStateProvider>
  ),
} satisfies Story;
