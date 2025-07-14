import type { IconName } from '@blueprintjs/icons';
import { useState } from 'react';
import type { FileWithPath } from 'react-dropzone';

import {
  DropZone,
  DropZoneContainer,
  Table,
  createTableColumnHelper,
} from '../../src/components/index.js';

export default {
  title: 'Components / DropZone',
};

interface DropZoneStoryProps {
  emptyIcon?: IconName;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyButtonText?: string;
  emptyButtonIcon?: IconName;
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

const columnHelper = createTableColumnHelper<FileWithPath>();
const columns = [
  columnHelper.accessor('path', { header: 'Path' }),
  columnHelper.accessor('name', { header: 'Name' }),
];

export function Control({
  emptyIcon,
  emptyTitle,
  emptyDescription,
  emptyButtonText,
  emptyButtonIcon,
}: DropZoneStoryProps) {
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
          validator={fileValidator}
          onDrop={(files: FileWithPath[]) => {
            setFiles(files);
          }}
          emptyIcon={emptyIcon}
          emptyTitle={emptyTitle}
          emptyDescription={emptyDescription}
          emptyButtonText={emptyButtonText}
          emptyButtonIcon={emptyButtonIcon}
        />
      </div>
      {files.length > 0 && <Table data={files} columns={columns} />}
    </div>
  );
}

Control.args = {
  emptyIcon: 'import',
  emptyTitle: 'No data loaded',
  emptyDescription: 'You can load data by drag-and-dropping files here',
  emptyButtonText: 'Select files',
  emptyButtonIcon: 'plus',
};

export function DropZoneContainerControl() {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  return (
    <div style={{ height: 500 }}>
      <DropZoneContainer
        validator={fileValidator}
        onDrop={(files: FileWithPath[]) => {
          setFiles(files);
        }}
      >
        {files.length > 0 ? (
          <Table data={files} columns={columns} />
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
