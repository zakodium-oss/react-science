import { Meta } from '@storybook/react';
import { useState } from 'react';
import { FileWithPath } from 'react-dropzone';

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
  onDrop: (file: FileWithPath[]) => void;
}

export function DropZoneControl({ color, onDrop }: DropZoneStoryProps) {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  return (
    <div>
      <DropZone
        color={color}
        onDrop={(files: FileWithPath[]) => {
          setFiles(files);
          onDrop(files);
        }}
      />
      {files.length > 0 && (
        <Table>
          <Table.Header>
            <ValueRenderers.Title value="path" />
            <ValueRenderers.Title value="name" />
          </Table.Header>
          {files.map(({ name, path }, i) => (
            <Table.Row key={i}>
              <ValueRenderers.Text value={path} />
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
  const [files, setFiles] = useState<FileWithPath[]>([]);
  return (
    <div>
      <DropZoneContainer
        color={color}
        onDrop={(files: FileWithPath[]) => {
          setFiles(files);
          onDrop(files);
        }}
      >
        {files.length > 0 ? (
          <Table>
            <Table.Header>
              <ValueRenderers.Title value="path" />
              <ValueRenderers.Title value="name" />
            </Table.Header>
            {files.map(({ name, path }, i) => (
              <Table.Row key={i}>
                <ValueRenderers.Text value={path} />
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
