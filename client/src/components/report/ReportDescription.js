import React from 'react';
import PropTypes from 'prop-types';
import Descriptions from 'antd/es/descriptions';


const ReportDescription = (props) => {
  const { report } = props;
  const { metaData } = report;

  return (
    <div className="mb-2">
      <Descriptions bordered title="Report Info" size="small">
        <Descriptions.Item label="Team">{metaData.teamName}</Descriptions.Item>
        <Descriptions.Item label="App">{metaData.appName}</Descriptions.Item>
        <Descriptions.Item label="Type">{metaData.testType}</Descriptions.Item>
        <Descriptions.Item
          label="Environment"
        >
          {metaData.testEnvName}
          {' on '}
          {metaData.testEnvZone}
        </Descriptions.Item>
        <Descriptions.Item label="When">
          {metaData.executionDate}
          {metaData.executionTime}
        </Descriptions.Item>
        <Descriptions.Item label="Automated">{report.isAutomated.toString()}</Descriptions.Item>
        {
          report.testNotes
          && <Descriptions.Item label="Notes">{report.testNotes}</Descriptions.Item>
        }
      </Descriptions>
    </div>
  );
};

ReportDescription.propTypes = {
  report: PropTypes.shape({
    isAutomated: PropTypes.bool,
    testNotes: PropTypes.string,
    metaData: {
      teamName: PropTypes.string,
      appName: PropTypes.string
    }
  })
};

ReportDescription.defaultProps = {
  report: {
    isAutomated: true,
    testNotes: undefined,
    metaData: {
      teamName: '',
      appName: ''
    }
  }
};

export default ReportDescription;
