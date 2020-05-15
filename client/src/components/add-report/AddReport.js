import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'antd/dist/antd.css';
import { DatePicker, TimePicker } from 'antd/es';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { addReport } from '../../actions/reportActions';
import { CLEAR_ERRORS, CLEAR_FILE } from '../../actions/types';
import InputError from '../common/input-error/InputError';
import SupportedTestingTools from '../../constants/SupportedTestingTools';

function AddReport() {
  const [filename, setFilename] = useState('Choose report file');
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
    appName, testType, testEnvZone, testEnvName, executionDate, executionTime, teamName,
    isAutomated, testNotes, testToolName, testToolVersion
  }) => {
    const newReport = {
      metaData: {
        teamName,
        appName,
        testType,
        testEnvZone,
        testEnvName,
        executionDate,
        executionTime,
        isAutomated: true
      },
      reportFile: (file) ? {
        metaData: {
          clientFilename: filename
        },
        file
      } : undefined,
      testToolName: testToolName || undefined,
      testToolVersion: testToolVersion || undefined,
      isAutomated,
      testNotes: testNotes || testToolName
    };

    dispatch({ type: CLEAR_ERRORS });
    dispatch({ type: CLEAR_FILE });

    dispatch(addReport(newReport));
  };

  return (
    <>
      <div className="container-fluid mt-3">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h5 className="text-center">Tell us about your test</h5>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="teamName" disabled>Team Name</InputGroup.Text>
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
            <InputError errors={errors.teamName} />
          </InputGroup>
          <Row>
            <Col>
              <Form.Group controlId="addReportForm.appName">
                <Form.Control
                  as="select"
                  name="appName"
                  ref={register({
                    required: 'This is required.',
                    minLength: {
                      value: 2,
                      message: 'Min length is 2'
                    }
                  })}
                >
                  <option value="">Select Application</option>
                  {
                    teamData.currentTeam.teamApps.map((app) => (
                      <option value={app.appName}>{app.appName}</option>
                    ))
                  }
                </Form.Control>
                <InputError errors={errors.appName} />
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
                <InputError errors={errors.testType} />
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
                  <option value="stage-stage">Stage-Stage</option>
                  <option value="qual">Qual</option>
                  <option value="qual-stage">Qual-Stage</option>
                  <option value="dev">Dev</option>
                  <option value="prod">Prod</option>
                  <option value="prod-stage">Prod-Stage</option>
                </Form.Control>
                <InputError errors={errors.testEnvName} />
              </Form.Group>
            </Col>
            <Col className="col-md-auto mt-2">
              <Form.Group>
                {[{
                  label: 'Cloud',
                  value: 'cloud',
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
                <InputError errors={errors.testEnvZone} />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="addReportForm.testToolName">
                <Form.Control
                  as="select"
                  name="testToolName"
                  ref={register()}
                >
                  <option value="">Select testing tool</option>
                  {
                    SupportedTestingTools.map(({ name, id }) => (
                      <option key={id} value={name}>{name}</option>
                    ))
                  }
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <div id="execution-date">
                <Form.Group>
                  <Form.Label id="uat-label" className="pr-3">Test Execution Date</Form.Label>
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
                    rules={{ required: 'This required' }}
                  />
                  <InputError errors={errors.executionDate || errors.executionTime} />
                </Form.Group>
              </div>
            </Col>
            <Col>
              <Form.Check inline label="Automated" type="checkbox" name="isAutomated" ref={register()} />
              <div id="upload-file">
                <div className="custom-file mb-2">
                  <input
                    type="file"
                    className="custom-file-input"
                    name="customFile"
                    id="customFile"
                    onChange={onChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">{filename}</label>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="addReportForm.testNotes">
                <Form.Label>Test Notes</Form.Label>
                <Form.Control name="testNotes" as="textarea" rows="3" ref={register} />
              </Form.Group>
            </Col>
          </Row>
          <input type="submit" value="Submit" className="btn btn-primary btn-block mt-2" />
        </Form>
      </div>
    </>
  );
}

export default AddReport;
