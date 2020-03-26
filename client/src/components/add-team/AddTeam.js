import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Spinner from 'react-bootstrap/Spinner';
import { setCurrentTeam, getTeam } from '../../actions/teamActions';


const AddTeam = ({
  existingTeams,
  isLoading
}) => {
  const dispatch = useDispatch();
  const [teamNameDropdown, setTeamNameDropdown] = useState('Select Team');
  const teamData = useSelector((state) => state.team);


  const setCurrentTeamFromStore = (id) => {
    // Check if team already exists in tea
    const team = teamData.existingTeams.find((t) => t._id === id);
    if (team) {
      dispatch(setCurrentTeam(team));
    } else {
      // TODO this use case will most likely never occur. Need to delete at some point.
      dispatch(getTeam(id));
    }
  };

  function onSelectTeam(id) {
    // TODO: Input Validation
    if (id !== '') {
      setCurrentTeamFromStore(id);
    }
    setTeamNameDropdown(existingTeams.filter((t) => t._id === id)[0].teamName);
  }

  return (
    <div className="container mt-3" id="add-team">
      <section className="jumbotron text-center">
        <div className="container container-sm">
          <h2 className="jumbotron-heading">
            Welcome to TEAR,
            <span className="text-muted"> get your test results fast!</span>
          </h2>
          <p className="lead text-muted">
            We&apos;ve created a set of tools to help organize tests results.
            Start by creating a team or selecting an existing team.
          </p>
          <ButtonGroup>
            <Button className="mr-2" variant="primary" as={NavLink} to="/team/add-team">
              Create New Team
            </Button>
            {
              isLoading ? (<Spinner className="ml-3" animation="grow" variant="secondary" />) : (
                <DropdownButton
                  id="dropdown-basic-button"
                  title={teamNameDropdown}
                  variant="secondary"
                  onSelect={onSelectTeam}
                >
                  {
                    existingTeams.map((team) => (
                      <Dropdown.Item
                        key={team._id}
                        eventKey={team._id}
                        value={team._id}
                      >
                        {team.teamName}
                      </Dropdown.Item>
                    ))
                  }
                </DropdownButton>
              )
            }
          </ButtonGroup>
        </div>
      </section>
    </div>
  );
};

AddTeam.propTypes = {
  existingTeams: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    teamName: PropTypes.string,
    teamEmail: PropTypes.string
  })),
  isLoading: PropTypes.bool
};

AddTeam.defaultProps = {
  existingTeams: [{
    _id: '',
    teamName: 'No Teams Found'
  }],
  isLoading: true
};

export default AddTeam;
