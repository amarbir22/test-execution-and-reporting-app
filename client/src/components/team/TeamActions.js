import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { getTeam, setCurrentTeam } from '../../actions/teamActions';
import TeamSelect from './TeamSelect';


const TeamActions = ({
  existingTeams,
  isLoading
}) => {
  const dispatch = useDispatch();
  const [teamNameDropdown, setTeamNameDropdown] = useState('Select Team');
  const teamData = useSelector((state) => state.team);


  const setCurrentTeamFromStore = (id) => {
    // Check if team already exists in tea
    const team = teamData.existingTeams.find((t) => t.id === id);
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
    setTeamNameDropdown(existingTeams.filter((t) => t.id === id)[0].teamName);
  }

  return (
    <>
      <Link to="/team/add-team">
        <Button className="m-1" variant="primary">
          Create New Team
        </Button>
      </Link>
      <TeamSelect
        teamList={existingTeams}
        onSelectTeam={onSelectTeam}
        teamNameDropdown={teamNameDropdown}
        isLoading={isLoading}
      />
    </>
  );
};

TeamActions.propTypes = {
  existingTeams: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    teamName: PropTypes.string,
    teamEmail: PropTypes.string
  })),
  isLoading: PropTypes.bool
};

TeamActions.defaultProps = {
  existingTeams: [{
    id: '',
    teamName: 'No Teams Found'
  }],
  isLoading: true
};

export default TeamActions;
