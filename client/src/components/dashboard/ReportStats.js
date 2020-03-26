import React from 'react';
import { Statistic } from 'antd/es';

import { Col, Row } from 'react-bootstrap';
import TeamOutlined from '@ant-design/icons/lib/icons/TeamOutlined';
import UsergroupAddOutlined from '@ant-design/icons/lib/icons/UsergroupAddOutlined';
import PropTypes from 'prop-types';


const ReportStats = (props) => {
  const { totalReportCount, totalTeamReportCount } = props;

  return (
    <div className="container ">
      <h4>Quality Stats</h4>
      <Row className="">
        <Col className="col-sm-auto">
          <Statistic
            title="All Reports"
            value={totalReportCount}
            prefix={<UsergroupAddOutlined />}
          />
        </Col>
        <Col>
          <Statistic
            title="Team Reports"
            value={totalTeamReportCount}
            prefix={<TeamOutlined />}
          />
        </Col>
      </Row>
    </div>
  );
};

ReportStats.propTypes = {
  totalReportCount: PropTypes.string,
  totalTeamReportCount: PropTypes.string
};

ReportStats.defaultProps = {
  totalReportCount: '',
  totalTeamReportCount: ''
};

export default ReportStats;
