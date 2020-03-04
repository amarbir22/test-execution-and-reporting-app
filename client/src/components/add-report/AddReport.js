import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useForm, Controller } from 'react-hook-form';
import { DatePicker, TimePicker } from 'antd';
import 'antd/dist/antd.css';


import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import { addReport } from '../../actions/addReportActions';

import AlertMessage from '../common/alert-message/AlertMessage';
import { CLEAR_ERRORS, CLEAR_FILE } from '../../actions/types';

function AddReport() {
  const [filename, setFilename] = useState('Choose File');
  const [reportUUID] = useState(uuidv4());
  const [file, setFile] = useState('');
  const addReportData = useSelector((state) => state.addReport);
  const reduxError = useSelector((state) => state.errors);
  const dispatch = useDispatch();
  const {
    register, handleSubmit, errors, control
  } = useForm();
  const { errorMessage } = reduxError;

  useEffect(() => () => {
    dispatch({ type: 'CLEAR_FILE' });
  }, []);

  const onChange = (e) => {
    // Setup load file state
    if (e.target && e.target.files.length) {
      setFile(e.target.files[0]);
      setFilename(e.target.files[0].name);
    }
  };

  const uploadStatus = {
    alertHeading: (errorMessage) ? 'Error uploading' : 'File uploaded',
    alertMessage: errorMessage || `Path: ${addReportData.fileData.serverPath}`,
    alertVariant: (errorMessage) ? 'danger' : 'success'
  };

  const onSubmit = ({
    applicationId, testType, testEnvZone, testEnvName, executionDate, executionTime
  }) => {
    const newReport = {
      reportUUID,
      reportData: {
        applicationId,
        testType,
        testEnvZone,
        testEnvName,
        executionDate,
        executionTime
      },
      fileData: {
        file,
        clientFilename: filename
      }
    };

    dispatch({ type: CLEAR_ERRORS });
    dispatch({ type: CLEAR_FILE });

    dispatch(addReport(newReport));
    uploadStatus.alertShow = true;
  };

  return (
    <div className="container">
      {
        (addReportData.isLoaded || errorMessage)
        && (
          <AlertMessage
            alertHeading={uploadStatus.alertHeading}
            alertMessage={uploadStatus.alertMessage}
            alertVariant={uploadStatus.alertVariant}
          />
        )
      }
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
                <option value="performance">Performance</option>
                <option value="api-functional">API Functional</option>
                <option value="api-response-ab">API Response AB</option>
                <option value="api-manual">API Manual</option>
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
                <option value="stage">Stage</option>
                <option value="qual">Qual</option>
                <option value="qual-live">Qual-Live</option>
                <option value="dev">Dev</option>
                <option value="prod">Prod</option>
              </Form.Control>
              {errors.testEnvName
              && <div className="invalid-feedback d-block errorMsg">{errors.testEnvName.message}</div>}
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <div id="execution-date">
              <Form.Group>
                <Form.Label id="uat-label" className="pr-3">Execution Date</Form.Label>
                <Controller
                  as={(
                    <DatePicker
                      size="large"
                    />
                  )}
                  name="executionDate"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'This required' }}
                />
                <Controller
                  as={
                    <TimePicker format="HH:mm" size="large" />
                  }
                  name="executionTime"
                  control={control}
                  rules={{ required: 'This is required' }}
                  defaultValue={moment('21:00', 'HH:mm')}
                />
                {(errors.executionDate || errors.executionTime)
                && (
                  <div
                    className="invalid-feedback d-block errorMsg"
                  >
                    {errors.executionDate.message}
                  </div>
                )}
              </Form.Group>
            </div>
          </Col>
          <Col>
            <div id="upload-file">
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
                && (
                <div
                  className="invalid-feedback d-block errorMsg"
                >
                  {errors.customFile.message}
                </div>
                )}
              </div>
            </div>
          </Col>
        </Row>
        <input type="submit" value="Upload" className="btn btn-primary btn-block mt-2" />
      </Form>
    </div>
  );
}

export default AddReport;
