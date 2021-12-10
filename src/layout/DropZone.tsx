/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { MdCloudUpload } from 'react-icons/md';

export default function DropZone(props?: {
  color?: string;
  width?: string;
  state: boolean;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [alert, setAlert] = useState('');
  const [active, setActive] = useState(props ? props.state : false);
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    acceptedFiles.forEach((file: Blob) => {
      const reader = new FileReader();

      reader.onabort = () => setAlert('file reading was aborted');
      reader.onerror = () => setAlert('file reading has failed');
      reader.onload = () => {
        setActive(true);
        // Do whatever you want with the file contents
        //const binaryStr = reader.result;
        setAlert('file uploaded');
        //console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div
        {...getRootProps()}
        css={css`
          overflow: hidden;
          position: relative;
          width: ${props ? props.width : '100%'};
          ${!active || isDragActive
            ? `border: 2px dashed ${props ? props.color : 'black'};`
            : null}

          color: ${props ? props.color : 'black'};
          border-radius: 20px;
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
            padding: 10px;
          `}
        >
          {active ? (
            <div
              css={css`
                width: 100%;
                z-index: -1;
                padding: 0;
                opacity: ${isDragActive ? 0.3 : 1};
              `}
            >
              {/*PlaceHolder*/}
              <div
                css={css`
                  margin: 0;
                  padding: 0;
                  height: 100%;
                  width: 100%;
                  background-color: blue;
                `}
              />
            </div>
          ) : null}

          {isDragActive ? (
            <>
              <div
                css={css`
                  z-index: 3;
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                `}
              >
                <MdCloudUpload
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
                      z-index: 2;
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
            cursor: pointer;
            z-index: ${active ? -2 : 1};
          `}
          {...getInputProps()}
        />
      </div>
    </>
  );
}
