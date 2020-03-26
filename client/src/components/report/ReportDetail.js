import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Card from 'antd/es/card';
import { getJsonReportByReportId } from '../../actions/reportActions';
import ReportFileTable from './ReportFileTable';
import ReportDescription from './ReportDescription';

const ReportDetail = () => {
  const { id } = useParams();
  const { jsonReport } = useSelector((state) => state.report);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJsonReportByReportId(id));
  }, []);

  return (
    <div className="container mt-3">
      <ReportDescription report={jsonReport.report} />
      <Card
        title="Performance KPIs"
      >
        <ReportFileTable data={jsonReport.content} id={id} />
      </Card>
    </div>
  );
};

export default ReportDetail;
