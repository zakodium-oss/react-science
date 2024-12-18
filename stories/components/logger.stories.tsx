import type { StoryObj } from '@storybook/react';
import { FifoLogger } from 'fifo-logger';

import {
  FifoLoggerDialog,
  FifoLoggerProvider,
} from '../../src/components/index.js';

export default {
  title: 'Components / Logger',
  component: FifoLoggerDialog,
};

type Story = StoryObj<typeof FifoLoggerDialog>;

const fifoLogger = new FifoLogger({ level: 'debug' });
export const Control = {
  argTypes: {
    logs: {
      table: {
        disable: true,
      },
    },
    onClose: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    isOpen: true,
    logs: [
      {
        id: 0,
        level: 10,
        error: new Error('Cannot fetch data'),
        levelLabel: 'error',
        message: 'Something went wrong!',
        uuids: [],
        meta: {},
        time: Date.now(),
      },
    ],
    unseen: 1,
  },
  decorators: [
    (Story) => {
      return (
        <FifoLoggerProvider logger={fifoLogger}>
          <Story />
        </FifoLoggerProvider>
      );
    },
  ],
} satisfies Story;
