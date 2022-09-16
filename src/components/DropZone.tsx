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
}

export function DropZoneContainer(
  props: DropZoneProps & {
    children: JSX.Element;
  },
) {
  const { children, ...other } = props;
  return (
    <DropZoneContent
      {...other}
      onClick={(event) => event.stopPropagation()}
      isContainer
    >
      {children}
    </DropZoneContent>
  );
}

export function DropZone(props: DropZoneProps) {
  return <DropZoneContent {...props} />;
}

function DropZoneContent(
  props: DropZoneProps & {
    children?: JSX.Element;
    isContainer?: boolean;
    onClick?: MouseEventHandler<HTMLDivElement>;
  },
) {
  const {
    color = 'black',
    children,
    onDrop,
    isContainer = false,
    onClick,
    fileValidator,
  } = props;

  const handleOnDrop = useCallback(
    <T extends File>(acceptedFiles: T[], rejectedFiles: FileRejection[]) => {
      onDrop?.(acceptedFiles, rejectedFiles);
    },
    [onDrop],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
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
        ${isContainer ? null : 'min-height: 150px; cursor: pointer;'}
        height: 100%;
        width: 100%;
        ${isDragActive || !isContainer ? `border: 2px dashed ${color};` : null}
        color: ${color};
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      <div
        css={css`
          text-align: center;
          font-weight: 600;
          width: 100%;
          height: 100%;
          display: flex;
        `}
      >
        <div
          css={css`
            width: 100%;
            opacity: ${isDragActive ? 0.3 : 1};
          `}
        >
          {children}
        </div>

        {isDragActive ? (
          <div
            css={css`
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            `}
          >
            <FaCloudUploadAlt
              size={70}
              css={css`
                margin: auto;
              `}
            />

            <p>Drop the files here</p>
          </div>
        ) : isContainer ? null : (
          <p>Drag and drop your files here, or click to select files</p>
        )}
      </div>
      <input
        type="file"
        css={css`
          opacity: 0;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        `}
        {...getInputProps()}
      />
    </div>
  );
}
