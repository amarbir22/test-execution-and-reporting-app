import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getJsonReportsByReportIds } from '../../actions/reportActions';
import ReportFileTable from './ReportFileTable';

const ReportCompare = (props) => {
  const { ids } = props;
  const report = useSelector((state) => state.report);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJsonReportsByReportIds(ids));
  }, []);

  return (
    <div className="container">
      <h3>Compare Performance Reports</h3>
      <ReportFileTable data={report.content} id={ids} />
    </div>
  );
};

ReportCompare.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string)
};
ReportCompare.defaultProps = {
  ids: []
};


export default ReportCompare;
