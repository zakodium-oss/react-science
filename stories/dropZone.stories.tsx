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
  },
} as Meta<DropZoneStoryProps>;

interface DropZoneStoryProps {
  color: string;
}

export function DropZoneControl(props: DropZoneStoryProps) {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <div>
      <DropZone
        color={props.color}
        onDrop={(files: File[]) =>
          setFiles((oldFiles) => [...oldFiles, ...files])
        }
      />
      {files.length > 0 && (
        <Table>
          <Table.Header>
            <ValueRenderers.Title value="webkitRelativePath" />
            <ValueRenderers.Title value="name" />
          </Table.Header>
          {files.map(({ name, webkitRelativePath }, i) => (
            <Table.Row key={i}>
              <ValueRenderers.Title value={webkitRelativePath} />
              <ValueRenderers.Title value={name} />
            </Table.Row>
          ))}
        </Table>
      )}
    </div>
  );
}
export function DropZoneContainerControl({ color }: DropZoneStoryProps) {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <div>
      <DropZoneContainer
        color={color}
        onDrop={(files: File[]) =>
          setFiles((oldFiles) => [...oldFiles, ...files])
        }
      >
        {files.length > 0 ? (
          <Table>
            <Table.Header>
              <ValueRenderers.Title value="webkitRelativePath" />
              <ValueRenderers.Title value="name" />
            </Table.Header>
            {files.map(({ name, webkitRelativePath }, i) => (
              <Table.Row key={i}>
                <ValueRenderers.Title value={webkitRelativePath} />
                <ValueRenderers.Title value={name} />
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
