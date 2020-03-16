import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'antd/dist/antd.css';
import { DatePicker, TimePicker } from 'antd';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { addReport } from '../../actions/reportActions';
import { CLEAR_ERRORS, CLEAR_FILE } from '../../actions/types';

function AddReport() {
  const [filename, setFilename] = useState('Choose report file');
  const [reportUUID] = useState(uuidv4());
  const [file, setFile] = useState('');
  const teamData = useSelector((state) => state.team);

  const dispatch = useDispatch();

  const {
    register, handleSubmit, errors, control
  } = useForm();

  useEffect(() => () => {
    dispatch({ type: 'CLEAR_FILE' });
    dispatch({ type: 'CLEAR_MESSAGE' });
  }, []);

  const onChange = (e) => {
    // Setup load file state
    if (e.target && e.target.files.length) {
      setFile(e.target.files[0]);
      setFilename(e.target.files[0].name);
    }
  };

  const onSubmit = ({
    applicationId, testType, testEnvZone, testEnvName, executionDate, executionTime, teamName
  }) => {
    const newReport = {
      reportUUID,
      teamName,
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
  };

  return (
    <>
      <div className="container mt-3">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h5 className="text-center">Tell us about your test</h5>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1" disabled>Team Name</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              disabled
              name="teamName"
              placeholder="Select a team from Home Page"
              value={teamData.currentTeam.teamName}
              aria-label="team-name"
              ref={register({
                required: 'This is required.',
                minLength: {
                  value: 2,
                  message: 'Min length is 2'
                }
              })}
            />
            {errors.teamName && (
              <div
                className="invalid-feedback d-block errorMsg"
              >
                {errors.teamName.message}
              </div>
            )}
          </InputGroup>
          <Row>
            <Col>
              <Form.Group controlId="addReportForm.applicationID">
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
                  <option value="">Select application under test</option>
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
                <Form.Control
                  as="select"
                  name="testType"
                  ref={register({ required: 'This is required.' })}
                >
                  <option value="">Select test type</option>
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
              <Form.Group controlId="addReportForm.env">
                <Form.Control
                  as="select"
                  name="testEnvName"
                  ref={register({ required: 'This is required.' })}
                >
                  <option value="">Select environment name</option>
                  <option value="stage">Stage</option>
                  <option value="qual">Qual</option>
                  <option value="qual-live">Qual-Live</option>
                  <option value="dev">Dev</option>
                  <option value="prod">Prod</option>
                </Form.Control>
                {errors.testEnvName
                && (
                  <div
                    className="invalid-feedback d-block errorMsg"
                  >
                    {errors.testEnvName.message}
                  </div>
                )}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                {[{
                  label: 'AWS',
                  value: 'aws',
                  id: 1
                }, {
                  label: 'On-Prem',
                  value: 'onprem',
                  id: 2
                }].map(({ label, value, id }) => (
                  <Form.Check
                    className="form-check-inline"
                    type="radio"
                    key={id}
                    label={`${label}`}
                    value={value}
                    name="testEnvZone"
                    id={`default-${label}`}
                    ref={register({ required: 'This is required.' })}
                  />
                ))}
                {errors.testEnvZone
                && (
                  <div
                    className="invalid-feedback d-block errorMsg"
                  >
                    {errors.testEnvZone.message}
                  </div>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <div id="execution-date">
                <Form.Group>
                  <Form.Label id="uat-label" className="pr-3">Execution on</Form.Label>
                  <Controller
                    as={(
                      <DatePicker />
                    )}
                    placeholder="Select date"
                    size="large"
                    name="executionDate"
                    control={control}
                    rules={{ required: 'This required' }}
                  />
                  <Controller
                    as={
                      <TimePicker />
                    }
                    format="HH:mm"
                    size="large"
                    name="executionTime"
                    control={control}
                    rules={{ required: 'This is required' }}
                  />
                  {(errors.executionDate || errors.executionTime)
                  && (
                    <div
                      className="invalid-feedback d-block errorMsg"
                    >
                      This is required
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
          <input type="submit" value="Submit" className="btn btn-primary btn-block mt-2" />
        </Form>
      </div>
    </>
  );
}

export default AddReport;
