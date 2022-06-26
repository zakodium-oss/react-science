import { Meta } from '@storybook/react';
import React from 'react';

import { DropZoneContainer, DropZone } from '../src/index';

export default {
  title: 'Layout/DropZone',

  argTypes: {
    color: {
      type: { name: 'string' },
      defaultValue: 'black',
      control: 'color',
    },
    onDrop: {
      type: { name: 'function' },
      defaultValue: () => alert('test'),
      action: 'files uploaded',
    },
  },
} as Meta<DropZoneStoryProps>;

interface DropZoneStoryProps {
  color: string;
  onDrop: (files: File[]) => void;
}

export function DropZoneControl(props: DropZoneStoryProps) {
  return <DropZone color={props.color} onDrop={props.onDrop} />;
}
export function DropZoneContainerControl(props: DropZoneStoryProps) {
  return (
    <DropZoneContainer color={props.color} onDrop={props.onDrop}>
      <div
        style={{
          backgroundColor: 'blue',
          height: '150px',
        }}
      >
        DropZone children
      </div>
    </DropZoneContainer>
  );
}
