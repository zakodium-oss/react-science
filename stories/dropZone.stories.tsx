import { Meta } from '@storybook/react';
import React, { useState } from 'react';

import {
  DropZoneContainer,
  DropZone,
  Table,
  ValueRenderers,
} from '../src/index';

export default {
  title: 'Layout/DropZone',
  argTypes: {
    color: {
      defaultValue: 'black',
      control: { type: 'color' },
    },
    onDrop: {
      action: 'files uploaded',
    },
  },
} as Meta<DropZoneStoryProps>;

interface DropZoneStoryProps {
  color: string;
  onDrop: (file: File[]) => void;
}

export function DropZoneControl({ color, onDrop }: DropZoneStoryProps) {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <div>
      <DropZone
        color={color}
        onDrop={(files: File[]) => {
          setFiles((oldFiles) => [...oldFiles, ...files]);
          onDrop(files);
        }}
      />
      {files.length > 0 && (
        <Table>
          <Table.Header>
            <ValueRenderers.Title value="webkitRelativePath" />
            <ValueRenderers.Title value="name" />
          </Table.Header>
          {files.map(({ name, webkitRelativePath }, i) => (
            <Table.Row key={i}>
              <ValueRenderers.Text value={webkitRelativePath} />
              <ValueRenderers.Text value={name} />
            </Table.Row>
          ))}
        </Table>
      )}
    </div>
  );
}
export function DropZoneContainerControl({
  color,
  onDrop,
}: DropZoneStoryProps) {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <div>
      <DropZoneContainer
        color={color}
        onDrop={(files: File[]) => {
          setFiles((oldFiles) => [...oldFiles, ...files]);
          onDrop(files);
        }}
      >
        {files.length > 0 ? (
          <Table>
            <Table.Header>
              <ValueRenderers.Title value="webkitRelativePath" />
              <ValueRenderers.Title value="name" />
            </Table.Header>
            {files.map(({ name, webkitRelativePath }, i) => (
              <Table.Row key={i}>
                <ValueRenderers.Text value={webkitRelativePath} />
                <ValueRenderers.Text value={name} />
              </Table.Row>
            ))}
          </Table>
        ) : (
          <div
            style={{
              backgroundColor: 'blue',
              height: '150px',
            }}
          >
            DropZone children
          </div>
        )}
      </DropZoneContainer>
    </div>
  );
}
