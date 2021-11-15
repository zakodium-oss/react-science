import { Meta } from '@storybook/react';
import React from 'react';

import DropZone from '../src/layout/DropZone';

export default {
  title: 'Layout/DropZone',
  args: {
    color: 'black',
  },
  argTypes: {
    color: {
      control: {
        type: 'color',
      },
    },
  },
} as Meta;

export function TestDropZone(props: { color: string }) {
  return <DropZone color={props.color} />; //we can add a color prop or it's black in default
}
