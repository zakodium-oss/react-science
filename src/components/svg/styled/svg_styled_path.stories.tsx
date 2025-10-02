import type { Meta, StoryObj } from '@storybook/react-vite';

import type { SVGStyledPathProps } from './svg_styled_path.js';
import { SVGStyledPath } from './svg_styled_path.js';

export default {
  title: 'Components / SVG / SVGStyledPath',
  component: SVGStyledPath,
  args: {
    stroke: '#000000',
    strokeOpacity: 1,
    strokeWidth: 1,
    strokeDasharray: 'solid',
    d: 'M 10 50 h 10 v -20 l 25 40 l 40 -50',
  },
  decorators: [
    (Story) => (
      <svg width={200} height={100} viewBox="0 0 200 100">
        <Story />
      </svg>
    ),
  ],
} as Meta<SVGStyledPathProps>;

type Story = StoryObj<SVGStyledPathProps>;

export const Control: Story = {};
