import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Button from 'antd/es/button';
import Card from 'antd/es/card';
import { getJsonReportsByReportIds } from '../../actions/reportActions';
import GenericReportTable from './GenericReportTable';

const ReportCompare = (props) => {
  const { ids, hasSelected } = props;
  const report = useSelector((state) => state.report);
  const dispatch = useDispatch();

  const onCompare = () => {
    dispatch(getJsonReportsByReportIds(ids));
  };

  const isMatchReportId = (value) => ids.some((id) => id === value.report._id);

  const getMergedReports = () => {
    const reportsFromStore = report.jsonReports.filter(isMatchReportId);
    const mergedReportsWithMeta = reportsFromStore.map((el) => {
      const o = { ...el };
      o.content = o.content.map((c) => ({
        environment: `${el.report.metaData.testEnvName} on ${el.report.metaData.testEnvZone}`,
        ...c,
        reportId: o.report._id
      }));
      return o;
    });
    if (mergedReportsWithMeta.length > 0) {
      // Flatten multiple content arrays to generate a single array for table
      return mergedReportsWithMeta.map((r) => r.content)
        .flat(1);
    }
    return undefined;
  };

  return (
    <Card
      title="Compare Report"
      className="mt-3"
    >
      <div id="compare-action">
        <Button
          type="primary"
          onClick={onCompare}
          disabled={!hasSelected}
          loading={report.isLoading}
        >
          Compare Reports
        </Button>
      </div>
      <GenericReportTable data={getMergedReports()} id="merged" />
    </Card>
  );
};

ReportCompare.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.string),
  hasSelected: PropTypes.bool
};

ReportCompare.defaultProps = {
  ids: [],
  hasSelected: false
};

export default ReportCompare;
