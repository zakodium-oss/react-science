/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { MouseEventHandler, useCallback, useMemo } from 'react';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt } from 'react-icons/fa';

export interface DropZoneProps {
  color?: string;
  borderColor?: string;
  onDrop?: <T extends File>(
    acceptedFiles: T[],
    rejectedFiles?: FileRejection[],
  ) => void;
  fileValidator?: <T extends File>(file: T) => FileError | FileError[] | null;
  emptyText?: string;
}

const dropZoneCss = {
  root: css`
    position: relative;
    height: 100%;
    width: 100%;
  `,
  dragActive: css`
    font-size: 1.5em;
    font-weight: 600;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0.7;
    background-color: white;
    border: 5px dashed;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
  empty: css`
    font-size: 1.5em;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 1em;
    border: 5px dashed;
    cursor: pointer;
  `,
};

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
    emptyText?: string;
  },
) {
  const {
    color = 'black',
    borderColor = 'gray',
    children = null,
    onDrop,
    emptyText = 'Click or drag and drop to add data.',
    onClick,
    fileValidator,
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
    <div {...getRootProps(getPropsOptions)} css={dropZoneCss.root}>
      {children}
      {isDragActive ? (
        <div
          css={dropZoneCss.dragActive}
          style={{
            borderColor,
            color,
          }}
        >
          <FaCloudUploadAlt size={70} />
          <p>Drop the files here.</p>
        </div>
      ) : !hasChildren ? (
        <div
          css={dropZoneCss.empty}
          style={{
            borderColor,
            color,
          }}
        >
          {emptyText}
        </div>
      ) : null}
      <input {...getInputProps()} />
    </div>
  );
}
