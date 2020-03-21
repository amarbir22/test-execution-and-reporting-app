import React from 'react';
import Table from 'antd/es/table/Table';
import PropTypes from 'prop-types';

const ReportFileTable = (props) => {
  const { columns, data, id } = props;
  return (
    <div id={id}>
      <Table
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

ReportFileTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    dataIndex: PropTypes.string,
    key: PropTypes.string
  })).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired
};

export default ReportFileTable;
