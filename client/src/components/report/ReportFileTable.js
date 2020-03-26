import React from 'react';
import Table from 'antd/es/table/Table';
import PropTypes from 'prop-types';

const ReportFileTable = (props) => {
  const { data, id } = props;


  const getColumnsFromFirstRowKeys = (firstRow) => Object.keys(firstRow)
    .map((header) => (
      {
        title: header,
        dataIndex: header,
        key: header
      }
    ));

  return (
    <div id={id}>
      {data.length > 0
      && (
        <Table
          columns={getColumnsFromFirstRowKeys(data[0])}
          dataSource={data}
        />
      )}
    </div>
  );
};

ReportFileTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  id: PropTypes.string
};

ReportFileTable.defaultProps = {
  data: [],
  id: ''
};

export default ReportFileTable;
