import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'antd/es/table';
import { getJsonReportByReportId } from '../../actions/reportActions';

const ShowReport = () => {
  const { id } = useParams();
  const [columns, setColumns] = useState([]);
  const { jsonReport } = useSelector((state) => state.report);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getJsonReportByReportId(id));
  }, []);

  useEffect(() => {
    const cols = [];
    if (jsonReport.content) {
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


  return (
    <div className="container">
      <h1>Report Placeholder</h1>
      <Table
        columns={columns}
        dataSource={jsonReport.content}
      />
    </div>
  );
};

export default ShowReport;
