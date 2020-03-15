import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addTeam } from '../../actions/teamActions';
import AlertMessage from '../common/alert-message/AlertMessage';

const AddTeamForm = () => {
  const [teamApps, setTeamApps] = useState([]);
  const [appName, setAppName] = useState();
  const teamData = useSelector((state) => state.team);
  const dispatch = useDispatch();


  const {
    register, handleSubmit, errors
  } = useForm();

  const onChangeAppNameInput = (e) => {
    setAppName(e.target.value);
  };

  const addApp = () => {
    if (appName && appName.length >= 3 && !teamApps.find((a) => a.appName === appName)) {
      setTeamApps([
        ...teamApps,
        {
          appName,
          appID: uuidv4()
        }
      ]);
    }
  };

  const deleteApp = (e) => {
    setTeamApps(teamApps.filter((el) => el.appID !== e.target.value));
  };


  function onSubmit({
    teamName, teamEmail
  }) {
    const newTeam = {
      teamName,
      teamEmail,
      teamApps
    };
    dispatch(addTeam(newTeam));
  }

  return (
    <div className="container mb-3">
      {
        (teamData.message)
        && (
          <AlertMessage
            alertMessage={teamData.message}
            alertVariant="success"
          />
        )
      }
      <h3>Create a team</h3>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon1">Team Name*</InputGroup.Text>
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
          {errors.teamName && (
            <div
              className="invalid-feedback d-block errorMsg"
            >
              {errors.teamName.message}
            </div>
          )}
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
          {errors.teamEmail && (
            <div
              className="invalid-feedback d-block errorMsg"
            >
              {errors.teamEmail.message}
            </div>
          )}
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="team-apps">Team Applications</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            name="teamApps"
            placeholder="Add each app your team will be working on"
            aria-label="teamApps"
            onChange={onChangeAppNameInput}
            ref={register({
              required: 'This is required.',
              minLength: {
                value: 2,
                message: 'Min length is 2'
              }
            })}
          />
          <InputGroup.Append>
            <Button id="team-apps" onClick={addApp}>Add</Button>
          </InputGroup.Append>
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
        {teamApps.length === 0 && (
          <div
            className="invalid-feedback d-block errorMsg"
          >
            At least one application required
          </div>
        )}
        <Button className="btn-block mt-2" variant="primary" type="submit">
          Save Team
        </Button>
      </Form>
    </div>
  );
};

export default AddTeamForm;
