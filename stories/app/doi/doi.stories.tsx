import type { Meta } from '@storybook/react-vite';

import type { DOIProps } from '../../../src/app/doi/doi.js';
import { DOI } from '../../../src/app/doi/doi.js';

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

export function Control(props: DOIProps) {
  return (
    <p>
      Check this DOI for more information: <DOI {...props} />
    </p>
  );
}
