import type { StoryObj } from '@storybook/react';
import { FifoLogger } from 'fifo-logger';

import {
  FifoLoggerDialog,
  FifoLoggerProvider,
} from '../../src/components/index.js';
import { logEntries } from '../data/logs.js';

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
    logs: logEntries,
    unseen: 22,
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
