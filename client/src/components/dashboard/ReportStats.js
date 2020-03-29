import React from 'react';
import { Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Card from 'antd/es/card';
import CustomPieChart from '../common/charts/CustomPieChart';


const ReportStats = (props) => {
  const { teamReportCountData, teamReportTypesData } = props;

  return (
    <div className="container">
      <Row className="site-card-border-less-wrapper">
        <Col>
          <Card title="Teams">
            <CustomPieChart data={teamReportCountData} />
          </Card>
        </Col>
        <Col>
          <Card title="Test Types">
            <CustomPieChart data={teamReportTypesData} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const chartDataShape = PropTypes.shape({
  name: PropTypes.string,
  value: PropTypes.number
});

ReportStats.propTypes = {
  teamReportCountData: PropTypes.arrayOf(chartDataShape),
  teamReportTypesData: PropTypes.arrayOf(chartDataShape)
};

ReportStats.defaultProps = {
  teamReportCountData: [],
  teamReportTypesData: []
};


export default ReportStats;
