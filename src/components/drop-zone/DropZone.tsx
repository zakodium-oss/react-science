/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { MouseEventHandler, useCallback, useMemo } from 'react';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt } from 'react-icons/fa';

export interface DropZoneProps {
  color?: string;
  onDrop?: <T extends File>(
    acceptedFiles: T[],
    rejectedFiles?: FileRejection[],
  ) => void;
  fileValidator?: <T extends File>(file: T) => FileError | FileError[] | null;
  emptyText?: string;
}

const messageStyle = css`
  font-weight: 600;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export interface DropZoneContainerProps extends DropZoneProps {
  children: JSX.Element | null;
}

export function DropZoneContainer(props: DropZoneContainerProps) {
  return <DropZoneContent {...props} />;
}

export function DropZone(props: DropZoneProps) {
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
    <div
      {...getRootProps(getPropsOptions)}
      css={css`
        overflow: hidden;
        position: relative;
        ${hasChildren ? null : 'min-height: 150px; cursor: pointer;'}
        height: 100%;
        width: 100%;
      `}
      style={{
        border:
          isDragActive || !hasChildren ? `2px dashed ${color}` : undefined,
      }}
    >
      <div
        css={css`
          width: 100%;
          height: 100%;
          display: flex;
        `}
      >
        {hasChildren ? (
          <div
            css={css`
              width: 100%;
              opacity: ${isDragActive ? 0.3 : 1};
            `}
          >
            {children}
          </div>
        ) : null}

        <div style={{ fontSize: '1.5em' }}>
          {isDragActive ? (
            <div css={messageStyle} style={{ color }}>
              <FaCloudUploadAlt
                size={70}
                css={css`
                  margin: auto;
                `}
              />

              <p>Drop the files here.</p>
            </div>
          ) : hasChildren ? null : (
            <p css={messageStyle} style={{ color }}>
              {emptyText}
            </p>
          )}
        </div>
      </div>
      <input
        type="file"
        css={css`
          text-align: center;
        `}
        {...getInputProps()}
      />
    </div>
  );
}
