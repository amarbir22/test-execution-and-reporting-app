import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'antd/es/table';
import { DeleteOutlined } from '@ant-design/icons';

import moment from 'moment';
import { NavLink } from 'react-router-dom';
import Button from 'antd/es/button';
import Popconfirm from 'antd/es/popconfirm';
import Card from 'antd/es/card';
import { deleteReportById, getAllReports } from '../../actions/reportActions';
import ReportCompare from './ReportCompare';


const ReportList = () => {
  const report = useSelector((state) => state.report);
  const currentTeam = useSelector((state) => state.team.currentTeam);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [selectedRowData, setSelectedRowData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllReports());
  }, []);

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const showReportFileLink = (data) => {
    if (!data.reportFile) {
      return undefined;
    }
    return (
      <NavLink to={`/report/${data.id}`} style={{ marginRight: 16 }}>
        View Report
      </NavLink>
    );
  };

  const onDeleteReport = (data) => {
    dispatch(deleteReportById(data.id));
  };

  const showDeleteAction = (data) => {
    if (currentTeam.teamName && currentTeam.teamName === data.teamName) {
      return (
        <Popconfirm
          title="Are you sure delete this report?"
          onConfirm={() => {
            onDeleteReport(data);
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button icon={<DeleteOutlined />} />
        </Popconfirm>
      );
    }
    return undefined;
  };


  const columns = [
    {
      title: 'Team Name',
      dataIndex: ['teamName'],
      key: 'teamName',
      sorter: (a, b) => a.teamName.localeCompare(b.teamName),
      sortOrder: sortedInfo.columnKey === 'teamName' && sortedInfo.order,
      ellipsis: true,
      hide: false
    },
    {
      title: 'Application',
      dataIndex: 'appName',
      key: 'appName',
      filters: [],
      filteredValue: filteredInfo.value || null,
      onFilter: (value, record) => record.appName.includes(value),
      sorter: (a, b) => a.appName.localeCompare(b.appName),
      sortOrder: sortedInfo.columnKey === 'appName' && sortedInfo.order,
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
      dataIndex: 'executionTime',
      key: 'executionTime',
      sorter: (a, b) => moment(a.executionTime)
        .unix() - moment(b.executionTime)
        .unix(),
      sortOrder: sortedInfo.columnKey === 'executionTime' && sortedInfo.order,
      ellipsis: true,
      hide: false
    },
    {
      title: 'Action',
      key: 'action',
      render: (data) => (
        <span>
          {
            showReportFileLink(data)
          }
          {
            showDeleteAction(data)
          }
        </span>
      )
    }
  ];

  const rowSelection = {
    onChange: (keyIndex, rowData) => {
      setSelectedRowKeys(keyIndex);
      setSelectedRowData(rowData);
    },
    getCheckboxProps: (record) => ({
      disabled: record.testType.toString() !== 'performance',
      name: record.testType
    })
  };
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <>
      <div className="container-fluid">
        <div>
          <Card title="All Reports">
            <Table
              loading={report.isLoading}
              columns={columns}
              dataSource={report.allReports}
              onChange={handleChange}
              rowKey={(record) => record.id}
              rowSelection={{
                ...rowSelection
              }}
            />
          </Card>
        </div>
        <ReportCompare ids={selectedRowKeys} hasSelected={hasSelected} />
      </div>
    </>
  );
};

export default ReportList;
