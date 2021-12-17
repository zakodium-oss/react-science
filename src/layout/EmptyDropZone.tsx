/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt } from 'react-icons/fa';

export default function EmptyDropZone(props: {
  color?: string;
  onDrop: (files: File[]) => void;
}) {
  const { color = 'black', onDrop: Drop } = props;
  const [active, setActive] = useState<boolean>(false);

  const onDrop = useCallback(
    (acceptedFiles) => {
      Drop(acceptedFiles);
      setActive(true);
    },
    [Drop],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <>
      <div
        {...getRootProps()}
        css={css`
          overflow: hidden;
          position: relative;
          min-height: 150px;
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
              {/*PlaceHolder*/}
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
                  {/*grey blur*/}
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
            <p>Drag & Drop your files here, or click to select files</p>
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
