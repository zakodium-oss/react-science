import { useState } from 'react';
import type { FileWithPath } from 'react-dropzone';

import {
  DropZoneContainer,
  DropZone,
  Table,
  ValueRenderers,
} from '../../src/components/index';

export default {
  title: 'Components / DropZone',
};

interface DropZoneStoryProps {
  color: string;
}

function fileValidator(file: File) {
  if (file?.name?.length > 20) {
    return {
      message: 'File name is larger than 20 characters',
      code: 'name-too-large',
    };
  }
  return null;
}

export function Control({
  color,
  emptyText,
}: DropZoneStoryProps & {
  emptyText?: string;
}) {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1em',
      }}
    >
      <div
        style={{
          height: 200,
        }}
      >
        <DropZone
          fileValidator={fileValidator}
          color={color}
          emptyText={emptyText}
          onDrop={(files: FileWithPath[]) => {
            setFiles(files);
          }}
        />
      </div>
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

Control.args = {
  color: 'black',
  emptyText: 'Click or drag and drop to add data.',
};

export function DropZoneContainerControl({ color }: DropZoneStoryProps) {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  return (
    <div style={{ height: 500 }}>
      <DropZoneContainer
        fileValidator={fileValidator}
        color={color}
        onDrop={(files: FileWithPath[]) => {
          setFiles(files);
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
              backgroundColor: 'lightblue',
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
