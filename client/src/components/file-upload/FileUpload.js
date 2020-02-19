import React, { useState } from 'react';
import axios from 'axios';

import AlertMessage from '../common/alert-message/AlertMessage';

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState({});

  const uploadStatus = {
    alertHeading: (message.error) ? 'Error Uploading File' : 'File Uploaded',
    alertMessage: message.error || `Filename: ${uploadedFile.fileName} Path: ${uploadedFile.filePath}`,
    alertVariant: (message.error) ? 'danger' : 'success',
    alertShow: Object.keys(message).length !== 0
  };

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage({});
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/api/upload', formData, {});
      const { fileName, filePath } = res.data;
      setUploadedFile({
        fileName,
        filePath
      });
      setMessage({
        body: 'File Uploaded',
        statusCode: res.status
      });
    } catch (err) {
      setMessage({
        error: err.response.data.msg || 'There was a server error in uploading file.',
        statusCode: err.response.status
      });
    }
  };

  return (
    <>
      {
        message.statusCode
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
