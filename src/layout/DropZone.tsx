/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt } from 'react-icons/fa';

export default function DropZone(props: {
  color?: string;
  children: JSX.Element;
  onDrop: (files: File[]) => void;
}) {
  const { color = 'black', children, onDrop } = props;

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

  return (
    <>
      <div
        {...getRootProps({ onClick: (event) => event.stopPropagation() })}
        css={css`
          overflow: hidden;
          position: relative;
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
            <p>Drag & Drop your files here</p>
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
    </>
  );
}
