import type { Meta, StoryObj } from '@storybook/react-vite';

import { DOI } from '../../../src/app/doi/doi.js';

export default {
  title: 'Components / Doi',
  component: DOI,
} as Meta;

export const Control = {
  args: {
    value: '10.3762/bjoc.20.4',
    size: 'small',
  },
  render: (args) => (
    <p>
      Check this DOI for more information: <DOI {...args} />
    </p>
  ),
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large'],
      },
    },
  },
} satisfies StoryObj<typeof DOI>;
