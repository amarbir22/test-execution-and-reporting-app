import React, { useState } from 'react';
import Table from 'antd/es/table/Table';
import PropTypes from 'prop-types';

const GenericReportTable = (props) => {
  const { data, id } = props;
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  const getColumnsFromFirstRowKeys = (firstRow) => Object.keys(firstRow)
    .map((header) => (
      {
        title: header,
        dataIndex: header,
        key: header,
        sorter: (a, b) => a[header].localeCompare(b[header]),
        sortOrder: sortedInfo.columnKey === header && sortedInfo.order
      }
    ));

  return (
    <div id={id}>
      {data.length > 0
      && (
        <Table
          pagination={{ pageSize: 25 }}
          columns={getColumnsFromFirstRowKeys(data[0])}
          dataSource={data}
          onChange={handleChange}
        />
      )}
    </div>
  );
};

GenericReportTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  id: PropTypes.string
};

GenericReportTable.defaultProps = {
  data: [],
  id: ''
};

export default GenericReportTable;
