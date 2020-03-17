import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddTeam from '../add-team/AddTeam';
import { getAllTeams } from '../../actions/teamActions';
import AddReport from '../add-report/AddReport';

const Home = () => {
  const teamData = useSelector((state) => state.team);
  const dispatch = useDispatch();
  const { existingTeams, isLoading } = teamData;

  useEffect(() => {
    // Update the document title using the browser API
    dispatch(getAllTeams());
  }, []);

  return (
    <>
      <AddTeam
        existingTeams={(existingTeams === undefined || existingTeams.length === 0)
          ? undefined : existingTeams}
        isLoading={isLoading}
      />
    </>
  );
};

export default Home;
