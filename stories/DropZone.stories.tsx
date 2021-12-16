import { Meta } from '@storybook/react';
import React from 'react';

import DropZone from '../src/layout/DropZone';
import EmptyDropZone from '../src/layout/EmptyDropZone';

export default {
  title: 'Layout/DropZone',
  args: {
    color: 'black',
    children: (
      <div
        style={{
          backgroundColor: 'blue',
          height: '150px',
        }}
      >
        hello world
      </div>
    ),
  },
  argTypes: {
    color: {
      control: {
        type: 'color',
      },
    },
  },
} as Meta;

export function Empty(props: { color: string }) {
  return <EmptyDropZone color={props.color} />; //we can add a color prop or it's black in default
}
export function Active(props: { color: string; children: JSX.Element }) {
  return <DropZone color={props.color} children={props.children} />; //we can add a color prop or it's black in default
}
