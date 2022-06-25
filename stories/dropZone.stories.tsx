import { Meta } from '@storybook/react';
import React from 'react';

import { DropZoneContainer, DropZone } from '../src/index';

export default {
  title: 'Layout/DropZone',
  args: {
    color: 'black',
    // eslint-disable-next-line no-alert
    onDrop: () => alert('files uploaded'),
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

export function DropZoneControl(props: DropzoneStoryProps) {
  return <DropZone color={props.color} onDrop={props.onDrop} />;
}
export function DropZoneContainerControl(props: DropzoneStoryProps) {
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
