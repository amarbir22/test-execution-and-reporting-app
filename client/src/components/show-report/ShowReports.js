import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'antd/es/table';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import { getAllReports } from '../../actions/reportActions';
import AlertMessage from '../common/alert-message/AlertMessage';


const ShowReports = () => {
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
      dataIndex: ['metaData', 'teamName'],
      key: 'teamName',
      sorter: (a, b) => a.metaData.teamName.localeCompare(b.metaData.teamName),
      sortOrder: sortedInfo.columnKey === 'teamName' && sortedInfo.order,
      ellipsis: true,
      hide: false
    },
    {
      title: 'Application',
      dataIndex: ['metaData', 'appName'],
      key: 'appName',
      filters: [{
        text: 'Joe',
        value: 'Joe'
      }, {
        text: 'Jim',
        value: 'Jim'
      }],
      filteredValue: filteredInfo.value || null,
      onFilter: (value, record) => record.appName.includes(value),
      sorter: (a, b) => a.metaData.appName.localeCompare(b.metaData.appName),
      sortOrder: sortedInfo.columnKey === 'appName' && sortedInfo.order,
      ellipsis: true
    },
    {
      title: 'Test Type',
      dataIndex: ['metaData', 'testType'],
      key: 'testType',
      sorter: (a, b) => a.metaData.testType.localeCompare(b.metaData.testType),
      sortOrder: sortedInfo.columnKey === 'testType' && sortedInfo.order,
      ellipsis: true,
      hide: false
    },
    {
      title: 'Test Env Zone',
      dataIndex: ['metaData', 'testEnvZone'],
      key: 'testEnvZone',
      sorter: (a, b) => a.metaData.testEnvZone.localeCompare(b.metaData.testEnvZone),
      sortOrder: sortedInfo.columnKey === 'testEnvZone' && sortedInfo.order,
      ellipsis: true,
      hide: false
    },
    {
      title: 'Execution Date',
      dataIndex: ['metaData', 'executionDate'],
      key: 'executionDate',
      sorter: (a, b) => moment(a.metaData.executionDate)
        .unix() - moment(b.metaData.executionDate)
        .unix(),
      sortOrder: sortedInfo.columnKey === 'executionDate' && sortedInfo.order,
      ellipsis: true,
      hide: false
    },
    {
      title: 'Execution Time',
      dataIndex: ['metaData', 'executionTime'],
      key: 'executionTime',
      sorter: (a, b) => moment(a.metaData.executionTime)
        .unix() - moment(b.metaData.executionTime)
        .unix(),
      sortOrder: sortedInfo.columnKey === 'executionTime' && sortedInfo.order,
      ellipsis: true,
      hide: false
    },
    {
      title: 'Action',
      key: 'action',
      render: (data, record) => (
        <span>
          <NavLink to={`/report/${data._id}`} style={{ marginRight: 16 }}>
            View Report
            {record.name}
          </NavLink>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#">Delete</a>
        </span>
      )
    }
  ];

  return (
    <>
      <div className="container container-lg">
        {errors.errorMessage
        && (
          <AlertMessage
            alertMessage={errors.errorMessage}
            alertVariant="danger"
          />
        )}
      </div>
      <div className="container">
        <h1>View Test Reports</h1>
        <div>
          <Table
            loading={report.isLoading}
            columns={columns}
            dataSource={report.allReports.map((rp) => rp)}
            onChange={handleChange}
          />
        </div>
      </div>
    </>
  );
};

export default ShowReports;
