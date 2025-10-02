import type { Meta, StoryObj } from '@storybook/react-vite';

import type { SVGStyledTextProps } from './svg_styled_text.js';
import { SVGStyledText } from './svg_styled_text.js';

export default {
  title: 'Components / SVG / SVGStyledText',
  component: SVGStyledText,
  args: {
    fill: '#000000',
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    x: 10,
    y: 50,
    children: 'Styled text',
  },
  decorators: [
    (Story) => (
      <svg width={200} height={100} viewBox="0 0 200 100">
        <Story />
      </svg>
    ),
  ],
} as Meta<SVGStyledTextProps>;

type Story = StoryObj<SVGStyledTextProps>;

export const Control: Story = {};
