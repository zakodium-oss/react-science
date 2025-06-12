import type { Meta, StoryObj } from '@storybook/react-vite';

import type { DOIProps } from '../../../src/components/index.js';
import { DOI } from '../../../src/components/index.js';

export default {
  title: 'Components / Doi',
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
} as Meta;

export const Control = {
  args: {
    value: '10.3762/bjoc.20.4',
    size: 'small',
  },
  render: (props: DOIProps) => (
    <p>
      Check this DOI for more information: <DOI {...props} />
    </p>
  ),
} satisfies StoryObj<typeof DOI>;
