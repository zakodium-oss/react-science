import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { InputPercent } from '../../src/components/index.js';

export default {
  title: 'Forms / InputPercent',
  component: InputPercent,
  decorators: (Story) => {
    return (
      <div style={{ width: 200, padding: 5 }}>
        <Story />
      </div>
    );
  },
} as Meta;

type Story = StoryObj<typeof InputPercent>;

export const Control = {
  argTypes: {
    onChange: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    value: 0.2,
    onChange: () => {},
    digits: undefined,
  },
} satisfies Story;

export const Functional = {
  argTypes: {
    onChange: {
      table: {
        disable: true,
      },
    },
    value: {
      table: {
        disable: true,
      },
    },
  },
  render: (props) => {
    const [state, setState] = useState(0);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        <InputPercent {...props} value={state} onChange={setState} />
        <p>State: {state}</p>
      </div>
    );
  },
} satisfies Story;
