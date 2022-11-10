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

export function Control({ color }: DropZoneStoryProps) {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  return (
    <div>
      <DropZone
        fileValidator={fileValidator}
        color={color}
        onDrop={(files: FileWithPath[]) => {
          setFiles(files);
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

Control.args = {
  color: 'black',
};

export function DropZoneContainerControl({ color }: DropZoneStoryProps) {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  return (
    <div>
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
