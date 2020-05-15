import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import Spinner from 'react-bootstrap/Spinner';

const TeamSelect = (props) => {
  const {
    teamList, onSelectTeam, teamNameDropdown, isLoading
  } = props;

  if (isLoading) {
    return (
      <Spinner className="ml-3" animation="grow" variant="secondary" />
    );
  }

  return (
    <>
      <Select
        id="dropdown-basic-button"
        className="m-1"
        defaultValue={teamNameDropdown}
        variant="secondary"
        onSelect={onSelectTeam}
      >
        {
          teamList.map((team) => (
            <Select.Option
              key={team.id}
              eventKey={team.id}
              value={team.id}
            >
              {team.teamName}
            </Select.Option>
          ))
        }
      </Select>
    </>
  );
};

TeamSelect.propTypes = {
  teamList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    teamName: PropTypes.string.isRequired
  })).isRequired,
  isLoading: PropTypes.bool.isRequired,
  onSelectTeam: PropTypes.func.isRequired,
  teamNameDropdown: PropTypes.string.isRequired
};


export default TeamSelect;
