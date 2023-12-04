import { NonIdealState, Button, Colors } from '@blueprintjs/core';
import type { IconName } from '@blueprintjs/icons';
import styled from '@emotion/styled';
import { rgba } from 'polished';
import { CSSProperties, MouseEventHandler, useCallback, useMemo } from 'react';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';

export interface DropZoneProps {
  borderColor?: string;
  onDrop?: <T extends File>(
    acceptedFiles: T[],
    rejectedFiles?: FileRejection[],
  ) => void;
  fileValidator?: <T extends File>(file: T) => FileError | FileError[] | null;
  emptyIcon?: IconName;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyButtonText?: string;
  emptyButtonIcon?: IconName;
}

const DropzoneRoot = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

interface DropzoneColorProps {
  borderColor: CSSProperties['borderColor'];
}

const DropzoneDragActive = styled.div<DropzoneColorProps>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border: 5px dashed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border-color: ${({ borderColor }) =>
    borderColor ? rgba(borderColor, 0.7) : ''};
`;

const DropzoneEmpty = styled.div<DropzoneColorProps>`
  :hover .dropzone-button {
    background-color: ${rgba(Colors.BLUE3, 0.15)};
  }
  width: 100%;
  height: 100%;
  padding: 1em;
  border: 5px dashed;
  cursor: pointer;

  border-color: ${({ borderColor }) => borderColor};
`;

export function DropZone(props: DropZoneProps) {
  return <DropZoneContent {...props} />;
}

export interface DropZoneContainerProps extends DropZoneProps {
  children: JSX.Element | null;
}

export function DropZoneContainer(props: DropZoneContainerProps) {
  return <DropZoneContent {...props} />;
}

function DropZoneContent(
  props: DropZoneProps & {
    children?: JSX.Element | null;
    onClick?: MouseEventHandler<HTMLDivElement>;
    emptyIcon?: IconName;
    emptyTitle?: string;
    emptyDescription?: string;
    emptyButtonText?: string;
    emptyButtonIcon?: IconName;
  },
) {
  const {
    borderColor = Colors.GRAY3,
    children = null,
    onDrop,
    onClick,
    fileValidator,
    emptyIcon = 'import',
    emptyTitle = 'No data loaded',
    emptyDescription = 'You can load data by drag-and-dropping files here',
    emptyButtonText = 'Select files',
    emptyButtonIcon = 'plus',
  } = props;

  const hasChildren = children !== null;

  const handleOnDrop = useCallback(
    <T extends File>(acceptedFiles: T[], rejectedFiles: FileRejection[]) => {
      onDrop?.(acceptedFiles, rejectedFiles);
    },
    [onDrop],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    noClick: hasChildren,
    validator: fileValidator,
    onDrop: handleOnDrop,
  });

  const getPropsOptions = useMemo(() => {
    if (onClick) {
      return { onClick };
    }
  }, [onClick]);

  return (
    <DropzoneRoot {...getRootProps(getPropsOptions)}>
      {children}
      {isDragActive ? (
        <DropzoneDragActive borderColor={borderColor}>
          <NonIdealState icon="cloud-upload" title="Drop the files here" />
        </DropzoneDragActive>
      ) : !hasChildren ? (
        <DropzoneEmpty borderColor={borderColor}>
          <NonIdealState
            icon={emptyIcon}
            title={emptyTitle}
            description={emptyDescription}
            action={
              <Button
                className="dropzone-button"
                outlined
                text={emptyButtonText}
                icon={emptyButtonIcon}
                intent="primary"
              />
            }
          />
        </DropzoneEmpty>
      ) : null}
      <input {...getInputProps()} />
    </DropzoneRoot>
  );
}
