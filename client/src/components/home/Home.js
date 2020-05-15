import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'antd/es/button';
import { Link } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import { getAllTeams } from '../../actions/teamActions';
import TeamActions from '../team/TeamActions';

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
      <div className="container-fluid mt-3" id="add-team">
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
          </div>
          <TeamActions
            existingTeams={existingTeams}
            isLoading={isLoading}
          />
          <Link to="/reporting/add-report">
            <Button className="m-1" variant="primary">
              Add Report
            </Button>
          </Link>
        </section>
      </div>
      <Dashboard />
    </>
  );
};

export default Home;
