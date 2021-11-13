import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import 'style.css';

import uploadImg from './upload.png';

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
      <div {...getRootProps()} className="drop-file-input">
        <div className="drop-file-input__label">
          <img src={uploadImg} alt="" />
          {isDragActive ? (
            <p>Drop the files here</p>
          ) : (
            <p>Drag & Drop your files here, or click to select files</p>
          )}
        </div>
        <input {...getInputProps()} />
      </div>
      <div>{alert}</div>
    </>
  );
}
