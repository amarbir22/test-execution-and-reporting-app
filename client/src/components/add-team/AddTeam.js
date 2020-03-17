import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Spinner from 'react-bootstrap/Spinner';
import { getTeam } from '../../actions/teamActions';
import AddTeamForm from './AddTeamForm';


const AddTeam = ({
  existingTeams,
  isLoading
}) => {
  const dispatch = useDispatch();
  const [teamNameDropdown, setTeamNameDropdown] = useState('Select Team');
  const [showAddTeamForm, setAddTeamForm] = useState(false);

  function onSelectTeam(e) {
    // TODO: Input Validation
    if (e !== '') {
      dispatch(getTeam(e));
    }
    setTeamNameDropdown(existingTeams.filter((t) => t._id === e)[0].teamName);
  }

  return (
    <div className="container" id="add-team">
      <section className="jumbotron text-center">
        <div className="container container-sm">
          <h2 className="jumbotron-heading">Welcome to TEAR, Get your test results faster!</h2>
          <p className="lead text-muted">
            We&apos;ve created a set of tools to help you organize your tests results.
            To get started you need to create a team or select an existing team. Once a team is
            created you can upload and manage test results specific to your team.
          </p>
          <ButtonGroup>
            <Button className="mr-2" variant="primary" onClick={() => setAddTeamForm(true)}>
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
      <div className="container" id="add-team">
        {
          showAddTeamForm
          && <AddTeamForm />
        }
      </div>
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
