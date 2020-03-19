import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Table from 'antd/es/table';

const ShowReport = () => {
  const { id } = useParams();
  const { allReports } = useSelector((state) => state.report);
  const columns = [];

  useEffect(() => {
    Object.keys(allReports[0].reportFile.translatedFile.content[0])
      .map((header) => columns.push(
        {
          title: header,
          dataIndex: header,
          key: header
        }
      ));
  }, []);


  return (
    <div className="container">
      <h1>Report Placeholder</h1>
      <Table
        columns={columns}
        dataSource={allReports.find((el) => el._id === id).reportFile.translatedFile.content}
      />
    </div>
  );
};

export default ShowReport;
