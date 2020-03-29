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

  const getReportsByTeams = () => {
    const teamNames = [...new Set(reports.allReports.map((r) => r.metaData.teamName))];
    return teamNames.map((name) => ({
      name,
      value: reports.allReports.filter((r) => r.metaData.teamName === name).length
    }));
  };

  const getReportsByType = () => {
    const reportTypes = [...new Set(reports.allReports.map((r) => r.metaData.testType))];
    return reportTypes.map((name) => ({
      name,
      value: reports.allReports.filter((r) => r.metaData.testType === name).length
    }));
  };

  useEffect(() => {
    dispatch(getAllReports());
  }, []);

  return (
    <div className="container">
      <ReportStats
        totalReportCount={reports.allReports.length.toString()}
        totalTeamReportCount={getTotalTeamReports()}
        teamReportCountData={getReportsByTeams()}
        teamReportTypesData={getReportsByType()}
      />
    </div>
  );
};

export default Dashboard;
