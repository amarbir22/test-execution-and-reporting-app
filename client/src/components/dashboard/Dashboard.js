import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReportStats from './ReportStats';
import { getAllReports } from '../../actions/reportActions';

const Dashboard = () => {
  const reports = useSelector((state) => state.report);
  const currentTeam = useSelector((state) => state.team.currentTeam);

  const dispatch = useDispatch();

  const getTotalTeamReports = () => {
    if (!currentTeam.teamName) {
      return 'select a team';
    }
    return reports.allReports.filter((r) => r.metaData.teamName === currentTeam.teamName)
      .length
      .toString();
  };

  useEffect(() => {
    dispatch(getAllReports());
  }, []);

  return (
    <div className="container">
      <ReportStats
        totalReportCount={reports.allReports.length.toString()}
        totalTeamReportCount={getTotalTeamReports()}
      />
    </div>
  );
};

export default Dashboard;
