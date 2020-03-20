import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { addTeam } from '../../actions/teamActions';
import InputError from '../common/input-error/InputError';

const AddTeamForm = () => {
  const [teamApps, setTeamApps] = useState([]);
  const dispatch = useDispatch();
  const {
    register, handleSubmit, errors, triggerValidation, setValue, setError, watch
  } = useForm();
  const appName = watch('appName');

  const addApp = async () => {
    const addAndValidate = () => {
      if (appName && appName.length >= 3 && !teamApps.find((a) => a.appName === appName)) {
        setTeamApps([
          ...teamApps,
          {
            appName,
            appID: uuidv4()
          }
        ]);
        setValue('appName', '');
        return Promise.resolve(`${appName} added app`);
      }
      return Promise.reject(new Error('App name must be at least 3 character long'));
    };

    addAndValidate()
      .then(() => {
        triggerValidation('appName');
      })
      .catch((err) => {
        setError('appName', 'minLength', err.message);
      });
  };

  const deleteApp = (e) => {
    setTeamApps(teamApps.filter((el) => el.appID !== e.target.value));
  };


  function onSubmit({
    teamName, teamEmail
  }, e) {
    const newTeam = {
      teamName,
      teamEmail,
      teamApps
    };
    dispatch(addTeam(newTeam));
    e.target.reset();
    setTeamApps([]);
  }

  return (
    <div className="container mt-3">
      <h3>Create a team</h3>
      <p className="lead text-muted">
        You need a team to save test reports. Once a team is set, you save reports for your team.
      </p>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Team Name</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            name="teamName"
            placeholder="Enter a team name"
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
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="team-email">Team Email</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            name="teamEmail"
            type="text"
            placeholder="Enter your team's point-of-contact person email"
            aria-label="team-email"
            ref={register({
              required: 'This is required.',
              pattern: {
                // eslint-disable-next-line no-useless-escape
                value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Enter a valid email'
              }
            })}
          />
          <InputError errors={errors.teamEmail} />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="team-apps">Team Applications</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            name="appName"
            placeholder="Add each app your team will be working on"
            aria-label="teamApps"
            ref={register({
              validate: {
                appsArraySize: () => teamApps.length >= 1
              }
            })}
          />
          <InputGroup.Append>
            <Button id="team-apps" onClick={addApp}>Add</Button>
          </InputGroup.Append>
          <InputError
            errors={(errors.appName && errors.appName.type === 'appsArraySize')
              ? { message: 'At least one app required' } : errors.appName}
          />
        </InputGroup>
        <h5>Team Apps List</h5>
        <ListGroup>
          {
            teamApps.map((app) => (
              <ListGroup.Item key={app.appID}>
                {app.appName}
                <Button
                  className="float-right btn-danger"
                  value={app.appID}
                  onClick={deleteApp}
                >
                  Remove
                </Button>
              </ListGroup.Item>
            ))
          }
        </ListGroup>
        <Button className="btn-block mt-2" variant="primary" type="submit">
          Save Team
        </Button>
      </Form>
    </div>
  );
};

export default AddTeamForm;
