import { Button, Colors, NonIdealState } from '@blueprintjs/core';
import type { IconName } from '@blueprintjs/icons';
import styled from '@emotion/styled';
import type { CSSProperties, MouseEventHandler, ReactElement } from 'react';
import * as dropzone from 'react-dropzone';
import tinycolor from 'tinycolor2';

export interface DropZoneProps extends dropzone.DropzoneOptions {
  borderColor?: string;
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
  inset: 0;
  background-color: rgb(255 255 255 / 70%);
  border: 5px dashed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-color: ${({ borderColor }) =>
    borderColor ?? tinycolor(borderColor).setAlpha(0.7).toRgbString()};
`;

const DropzoneEmpty = styled.div<DropzoneColorProps>`
  :hover .dropzone-button {
    background-color: ${tinycolor(Colors.BLUE3).setAlpha(0.15).toRgbString()};
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
  children: ReactElement | null;
}

export function DropZoneContainer(props: DropZoneContainerProps) {
  return <DropZoneContent {...props} />;
}

function DropZoneContent(
  props: DropZoneProps & {
    children?: ReactElement | null;
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
    onClick,
    emptyIcon = 'import',
    emptyTitle = 'No data loaded',
    emptyDescription = 'You can load data by drag-and-dropping files here',
    emptyButtonText = 'Select files',
    emptyButtonIcon = 'plus',
    noClick,
    ...otherProps
  } = props;

  const hasChildren = children !== null;

  const { getRootProps, getInputProps, isDragActive } = dropzone.useDropzone({
    noClick: noClick ?? hasChildren,
    ...otherProps,
  });

  return (
    <DropzoneRoot {...getRootProps({ onClick })}>
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
                variant="outlined"
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
