import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const AddTeam = ({
  existingTeams
}) => {
  // TODO: Should be fetched from /team api
  // eslint-disable-next-line no-param-reassign
  existingTeams = existingTeams || [
    {
      teamID: '124',
      teamName: 'G-team',
      id: 'someID'
    },
    {
      teamID: '355',
      teamName: 'B-Team',
      id: 'otherID'
    }
  ];
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
            <Button className="mr-2" variant="primary">Create New Team</Button>
            <DropdownButton
              id="dropdown-basic-button"
              title="Select Existing Team"
              variant="secondary"
            >
              {
                existingTeams
                && existingTeams.map((team) => (
                  <Dropdown.Item key={team.id} href="#/action-1">{team.teamName}</Dropdown.Item>
                ))
              }
            </DropdownButton>
          </ButtonGroup>
        </div>
      </section>
    </div>
  );
};

AddTeam.propTypes = {
  existingTeams: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    teamName: PropTypes.string,
    teamEmail: PropTypes.string
  }))
};

AddTeam.defaultProps = {
  existingTeams: null
};

export default AddTeam;
