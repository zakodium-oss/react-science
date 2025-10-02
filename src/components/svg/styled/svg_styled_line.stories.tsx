import type { Meta, StoryObj } from '@storybook/react-vite';

import type { SVGStyledLineProps } from './svg_styled_line.js';
import { SVGStyledLine } from './svg_styled_line.js';

export default {
  title: 'Components / SVG / SVGStyledLine',
  component: SVGStyledLine,
  args: {
    stroke: '#000000',
    strokeOpacity: 1,
    strokeWidth: 1,
    strokeDasharray: 'solid',
    x1: 10,
    x2: 190,
    y1: 50,
    y2: 50,
  },
  decorators: [
    (Story) => (
      <svg width={200} height={100} viewBox="0 0 200 100">
        <Story />
      </svg>
    ),
  ],
} as Meta<SVGStyledLineProps>;

type Story = StoryObj<SVGStyledLineProps>;

export const Control: Story = {};
