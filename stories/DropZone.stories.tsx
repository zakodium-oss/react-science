import { Meta } from '@storybook/react';
import React, { useCallback } from 'react';

import DropZone from '../src/layout/DropZone';
import EmptyDropZone from '../src/layout/EmptyDropZone';

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

export function Empty(props: { color: string }) {
  return (
    <EmptyDropZone
      color={props.color}
      Drop={useCallback(() => {
        //test
      }, [])}
    />
  );
}
export function Active(props: { color: string; children: JSX.Element }) {
  return (
    <DropZone
      color={props.color}
      children={props.children}
      Drop={useCallback(() => {
        //test
      }, [])}
    />
  );
}
