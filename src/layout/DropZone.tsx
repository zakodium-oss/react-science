/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { MdCloudUpload } from 'react-icons/md';

export default function DropZone() {
  const [alert, setAlert] = useState('');
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    acceptedFiles.forEach((file: Blob) => {
      const reader = new FileReader();

      reader.onabort = () => setAlert('file reading was aborted');
      reader.onerror = () => setAlert('file reading has failed');
      reader.onload = () => {
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
          position: relative;
          height: 200px;
          border: 2px dashed black;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          &:hover {
            opacity: 0.9;
          }
        `}
      >
        <div
          css={css`
            text-align: center;
            font-weight: 600;
            padding: 10px;
          `}
        >
          <MdCloudUpload
            size={70}
            css={css`
              margin: auto;
            `}
          />
          {isDragActive ? (
            <p>Drop the files here</p>
          ) : (
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
          `}
          {...getInputProps()}
        />
      </div>
      <div>{alert}</div>
    </>
  );
}
