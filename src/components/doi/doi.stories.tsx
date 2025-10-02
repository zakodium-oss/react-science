import type { Meta, StoryObj } from '@storybook/react-vite';

import type { DOIProps } from '../index.js';
import { DOI } from '../index.js';

export default {
  title: 'Components / DOI',
  component: DOI,
  args: {
    value: '10.3762/bjoc.20.4',
    size: 'small',
  },
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large'],
      },
    },
  },
} as Meta<DOIProps>;

type Story = StoryObj<DOIProps>;

export const Control: Story = {};
