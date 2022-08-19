import { useState } from 'react';
import { FileError, FileWithPath } from 'react-dropzone';

import {
  DropZoneContainer,
  DropZone,
  Table,
  ValueRenderers,
} from '../src/index';

export default {
  title: 'Layout/DropZone',
  argTypes: {
    fileValidator: {
      defaultValue: (file: File) => {
        if (file.name.length > 20) {
          // eslint-disable-next-line no-alert
          alert(`The file "${file.name}" name is larger than 20 characters`);
          return {
            code: 'name-too-large',
          };
        }
      },
    },
    color: {
      defaultValue: 'black',
      control: { type: 'color' },
    },
    onDrop: {
      action: 'files uploaded',
    },
  },
};

interface DropZoneStoryProps {
  color: string;
  onDrop: (file: FileWithPath[]) => void;
  fileValidator?: (file: File) => FileError;
}

export function DropZoneControl({ onDrop, ...other }: DropZoneStoryProps) {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  return (
    <div>
      <DropZone
        {...other}
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
  onDrop,
  ...other
}: DropZoneStoryProps) {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  return (
    <div>
      <DropZoneContainer
        {...other}
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
