import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useForm } from 'react-hook-form';

import { uploadFile } from '../../actions/fileUploadActions';
import AlertMessage from '../common/alert-message/AlertMessage';

function AddReport() {
  const [filename, setFilename] = useState('Choose File');
  const [file, setFile] = useState('');
  const fileUpload = useSelector((state) => state.fileUpload);
  const reduxError = useSelector((state) => state.errors);
  const dispatch = useDispatch();
  const {
    register, handleSubmit, errors
  } = useForm();
  const { errorMessage } = reduxError;

  useEffect(() => () => {
    dispatch({ type: 'CLEAR_FILE' });
  }, []);

  const onChange = (e) => {
    // Setup load file state
    if (e.target.files.length) {
      setFile(e.target.files[0]);
      setFilename(e.target.files[0].name);
    }
  };

  const uploadStatus = {
    alertHeading: (errorMessage) ? 'Error uploading' : 'File uploaded',
    alertMessage: errorMessage || `Filename: ${fileUpload.fileName} Path: ${fileUpload.filePath}`,
    alertVariant: (errorMessage) ? 'danger' : 'success'
  };

  const onSubmit = (data) => {
    dispatch(uploadFile(file));
    uploadStatus.alertShow = true;
  };

  return (
    <div className="container">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h5>Tell us about your test</h5>
        <Row>
          <Col>
            <Form.Group controlId="addReportForm.applicationID">
              <Form.Label id="uat-label">Application under test</Form.Label>
              <Form.Control
                as="select"
                name="applicationId"
                ref={register({
                  required: 'This is required.',
                  minLength: {
                    value: 2,
                    message: 'Min length is 2'
                  }
                })}
              >
                <option value="">* Select Application</option>
                <option value="maps">Maps</option>
                <option value="media-player">Media Player</option>
                <option value="dummy-app">Dummy App</option>
                <option value="music">Music</option>
                <option value="tear">TEAR</option>
              </Form.Control>
              {errors.applicationId && (
                <div
                  className="invalid-feedback d-block errorMsg"
                >
                  {errors.applicationId.message}
                </div>
              )}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="addReportForm.testType">
              <Form.Label id="testType">Test type</Form.Label>
              <Form.Control
                as="select"
                name="testType"
                ref={register({ required: 'This is required.' })}
              >
                <option value="">* Select Test Type</option>
                <option>Performance</option>
                <option>API Functional</option>
                <option>API Response AB</option>
                <option>API Manual</option>
                <option>UI Integration</option>
              </Form.Control>
              {errors.testType
              && <div className="invalid-feedback d-block errorMsg">{errors.testType.message}</div>}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label className="mr3">Environment zone</Form.Label>
              {[{
                label: 'AWS',
                value: 'aws'
              }, {
                label: 'On-Prem',
                value: 'onprem'
              }].map(({ label, value }, key) => (
                <Form.Check
                  type="radio"
                  className="form-check"
                  key={key}
                  label={`${label}`}
                  value={value}
                  name="testEnvZone"
                  id={`default-${label}`}
                  ref={register({ required: 'This is required.' })}
                />
              ))}
              {errors.testEnvZone
              && <div className="invalid-feedback d-block errorMsg">{errors.testEnvZone.message}</div>}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="addReportForm.env">
              <Form.Label id="uat-label">Environment name </Form.Label>
              <Form.Control
                as="select"
                name="testEnvName"
                ref={register({ required: 'This is required.' })}
              >
                <option>Stage</option>
                <option>Qual</option>
                <option>Qual-Live</option>
                <option>Dev</option>
                <option>Prod</option>
              </Form.Control>
              {errors.testEnvName
              && <div className="invalid-feedback d-block errorMsg">{errors.testEnvName.message}</div>}
            </Form.Group>
          </Col>
        </Row>
        <h5>Tell us about the report</h5>
        <p> We need this formation to correctly read the report and store it apprpriately </p>
        <div id="upload-file">
          {
            (fileUpload.isLoaded || errorMessage)
            && (
              <AlertMessage
                alertHeading={uploadStatus.alertHeading}
                alertMessage={uploadStatus.alertMessage}
                alertVariant={uploadStatus.alertVariant}
              />
            )
          }
          <div className="custom-file mb-2">
            <input
              type="file"
              className="custom-file-input"
              name="customFile"
              id="customFile"
              onChange={onChange}
              ref={register({ required: 'This is required.' })}
            />
            <label className="custom-file-label" htmlFor="customFile">{filename}</label>
            {errors.customFile
            && <div className="invalid-feedback d-block errorMsg">{errors.customFile.message}</div>}
          </div>
          <input type="submit" value="Upload" className="btn btn-primary btn-block mt-2" />
        </div>
      </Form>
    </div>
  );
}

export default AddReport;
