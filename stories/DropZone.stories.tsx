import { Meta } from '@storybook/react';
import React from 'react';

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
    onDrop: {
      action: 'onDrop',
    },
  },
} as Meta;

interface DropzoneStoryProps {
  color: string;
  onDrop: (files: File[]) => void;
}

export function Empty(props: DropzoneStoryProps) {
  return <EmptyDropZone color={props.color} onDrop={props.onDrop} />;
}
export function Active(props: DropzoneStoryProps) {
  return (
    <DropZone color={props.color} onDrop={props.onDrop}>
      <div
        style={{
          backgroundColor: 'blue',
          height: '150px',
        }}
      >
        DropZone children
      </div>
    </DropZone>
  );
}
