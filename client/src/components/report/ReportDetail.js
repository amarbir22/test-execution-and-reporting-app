import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getJsonReportByReportId } from '../../actions/reportActions';
import ReportFileTable from './ReportFileTable';

const ReportDetail = () => {
  const { id } = useParams();
  const [columns, setColumns] = useState([]);
  const { jsonReport } = useSelector((state) => state.report);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJsonReportByReportId(id));
  }, []);

  useEffect(() => {
    const cols = [];
    if (jsonReport && jsonReport.content) {
      Object.keys(jsonReport.content[0])
        .map((header) => cols.push(
          {
            title: header,
            dataIndex: header,
            key: header
          }
        ));
    }
    setColumns(cols);
  }, [jsonReport]);

  const getJsonReportContent = (data) => {
    if (!data) {
      return [];
    }
    return data.content || [];
  };

  return (
    <div className="container">
      <h1>Report Placeholder</h1>
      <ReportFileTable columns={columns} data={getJsonReportContent(jsonReport)} id={id} />
    </div>
  );
};

export default ReportDetail;
