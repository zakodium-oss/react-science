/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { MouseEventHandler, useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt } from 'react-icons/fa';

export function DropZoneContainer(props: {
  color?: string;
  children: JSX.Element;
  onDrop: (files: File[]) => void;
}) {
  const { color, children, onDrop } = props;
  return (
    <DropZoneContent
      onDrop={onDrop}
      color={color}
      children={children}
      isContainer
      onClick={(event) => event.stopPropagation()}
    />
  );
}

export function DropZone(props: {
  color?: string;
  onDrop: (files: File[]) => void;
}) {
  const { color = 'black', onDrop } = props;
  return <DropZoneContent color={color} onDrop={onDrop} isContainer={false} />;
}

function DropZoneContent(props: {
  children?: JSX.Element;
  isContainer: boolean;
  color?: string;
  onDrop: (files: File[]) => void;
  onClick?: MouseEventHandler<HTMLDivElement>;
}) {
  const { color = 'black', children, onDrop, isContainer, onClick } = props;

  const [active, setActive] = useState<boolean>(children ? true : false);
  const handleOnDrop = useCallback(
    (acceptedFiles) => {
      onDrop(acceptedFiles);
      setActive(true);
    },
    [onDrop],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleOnDrop,
  });

  const description = isContainer
    ? 'Drag & Drop your files here, or click to select files'
    : 'Drag & Drop your files here';

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
        ${isContainer ? null : 'min-height: 150px;'}
        height: 100%;
        width: 100%;
        ${!active || isDragActive ? `border: 2px dashed ${color};` : null}
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
        `}
      >
        {active ? (
          <div
            css={css`
              width: 100%;
              opacity: ${isDragActive ? 0.3 : 1};
            `}
          >
            {children}
          </div>
        ) : null}

        {isDragActive ? (
          <>
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
            {active ? (
              <>
                <div
                  css={css`
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.3);
                  `}
                />
              </>
            ) : null}
          </>
        ) : active ? null : (
          <p>{description}</p>
        )}
      </div>
      <input
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
