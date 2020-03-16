import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'antd/es/table';
import moment from 'moment';

import { getAllReports } from '../../actions/reportActions';
import AlertMessage from '../common/alert-message/AlertMessage';


const ShowReport = () => {
  const report = useSelector((state) => state.report);
  const errors = useSelector((state) => state.errors);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getAllReports());
  }, []);

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };


  const columns = [
    {
      title: 'Team Name',
      dataIndex: 'teamName',
      key: 'teamName',
      sorter: (a, b) => a.teamName.localeCompare(b.teamName),
      sortOrder: sortedInfo.columnKey === 'teamName' && sortedInfo.order,
      ellipsis: true,
      hide: false
    },
    {
      title: 'Application',
      dataIndex: 'applicationId',
      key: 'applicationId',
      filters: [{
        text: 'Joe',
        value: 'Joe'
      }, {
        text: 'Jim',
        value: 'Jim'
      }],
      filteredValue: filteredInfo.value || null,
      onFilter: (value, record) => record.applicationId.includes(value),
      sorter: (a, b) => a.applicationId.localeCompare(b.applicationId),
      sortOrder: sortedInfo.columnKey === 'applicationId' && sortedInfo.order,
      ellipsis: true
    },
    {
      title: 'Test Type',
      dataIndex: 'testType',
      key: 'testType',
      sorter: (a, b) => a.testType.localeCompare(b.testType),
      sortOrder: sortedInfo.columnKey === 'testType' && sortedInfo.order,
      ellipsis: true,
      hide: false
    },
    {
      title: 'Test Env Zone',
      dataIndex: 'testEnvZone',
      key: 'testEnvZone',
      sorter: (a, b) => a.testEnvZone.localeCompare(b.testEnvZone),
      sortOrder: sortedInfo.columnKey === 'testEnvZone' && sortedInfo.order,
      ellipsis: true,
      hide: false
    },
    {
      title: 'Execution Date',
      dataIndex: 'executionDate',
      key: 'executionDate',
      sorter: (a, b) => moment(a.executionDate)
        .unix() - moment(b.executionDate)
        .unix(),
      sortOrder: sortedInfo.columnKey === 'executionDate' && sortedInfo.order,
      ellipsis: true,
      hide: false
    },
    {
      title: 'Execution Time',
      dataIndex: 'reportData.executionTime',
      key: 'executionTime',
      sorter: (a, b) => moment(a.executionTime)
        .unix() - moment(b.executionTime)
        .unix(),
      sortOrder: sortedInfo.columnKey === 'executionTime' && sortedInfo.order,
      ellipsis: true,
      hide: false
    }
  ];

  return (
    <>
      <div>
        {errors.errorMessage
        && (
          <AlertMessage
            alertMessage={errors.errorMessage}
            alertVariant="danger"
          />
        )}
      </div>
      <div className="container">
        <h1>View Reports</h1>
        <div>
          <Table
            loading={report.isLoading}
            columns={columns}
            dataSource={report.reports.map((rp) => rp)}
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
};

export default ShowReport;
