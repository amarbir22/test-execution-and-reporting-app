import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import AlertMessage from '../alert-message/AlertMessage';
import { uploadFile } from '../../../actions/fileUploadActions';

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const fileUpload = useSelector((state) => state.fileUpload);
  const errors = useSelector((state) => state.errors);
  const dispatch = useDispatch();

  const { errorMessage } = errors;

  useEffect(() => () => {
    dispatch({ type: 'CLEAR_FILE' });
  }, []);

  const uploadStatus = {
    alertHeading: (errorMessage) ? 'Error uploading' : 'File uploaded',
    alertMessage: errorMessage || `Filename: ${fileUpload.fileName} Path: ${fileUpload.filePath}`,
    alertVariant: (errorMessage) ? 'danger' : 'success'
  };

  const onChange = (e) => {
    if (e.target.files.length) {
      setFile(e.target.files[0]);
      setFilename(e.target.files[0].name);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(uploadFile(file));
    uploadStatus.alertShow = true;
  };

  return (
    <>
      {
        (fileUpload.isLoaded || errors.errorMessage)
        && (
          <AlertMessage
            alertHeading={uploadStatus.alertHeading}
            alertMessage={uploadStatus.alertMessage}
            alertVariant={uploadStatus.alertVariant}
          />
        )
      }
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-2">
          <input type="file" className="custom-file-input" id="customFile" onChange={onChange} />
          <label className="custom-file-label" htmlFor="customFile">{filename}</label>
        </div>
        <input type="submit" value="Upload" className="btn btn-primary btn-block mt-2" />
      </form>
    </>
  );
};

export default FileUpload;
