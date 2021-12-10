import { Meta } from '@storybook/react';
import React from 'react';

import DropZone from '../src/layout/DropZone';

export default {
  title: 'Layout/DropZone',
  args: {
    color: 'black',
    width: '50%',
  },
  argTypes: {
    color: {
      control: {
        type: 'color',
      },
    },
    width: {
      control: {
        type: 'text',
      },
    },
  },
} as Meta;

export function Empty(props: { color: string; width: string }) {
  return <DropZone state={false} color={props.color} width={props.width} />; //we can add a color prop or it's black in default
}
export function Active(props: { color: string; width: string }) {
  return <DropZone state color={props.color} width={props.width} />; //we can add a color prop or it's black in default
}
