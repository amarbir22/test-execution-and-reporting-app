import React from 'react';
import PropTypes from 'prop-types';
import Descriptions from 'antd/es/descriptions';


const ReportDescription = (props) => {
  const { report } = props;
  const { metaData } = report;

  return (
    <div className="mb-2">
      <Descriptions bordered title="Report description" size="small">
        <Descriptions.Item key={metaData.teamName} label="Team">
          {metaData.teamName}
        </Descriptions.Item>
        <Descriptions.Item key={metaData.appName} label="App">
          {metaData.appName}
        </Descriptions.Item>
        <Descriptions.Item key={metaData.testType} label="Type">
          {metaData.testType}
        </Descriptions.Item>
        <Descriptions.Item key={metaData.testEnvName} label="Environment">
          {metaData.testEnvName}
          {' on '}
          {metaData.testEnvZone}
        </Descriptions.Item>
        <Descriptions.Item label="When" key={metaData.executionDate}>
          {metaData.executionDate}
          {metaData.executionTime}
        </Descriptions.Item>
        <Descriptions.Item label="Automated" key={report.isAutomated.toString()}>
          {report.isAutomated.toString()}
        </Descriptions.Item>
        {
          report.testNotes
          && (
            <Descriptions.Item label="Notes" key={report.testNotes}>
              {report.testNotes}
            </Descriptions.Item>
          )
        }
      </Descriptions>
    </div>
  );
};

ReportDescription.propTypes = {
  report: PropTypes.shape({
    isAutomated: PropTypes.bool,
    testNotes: PropTypes.string,
    metaData: PropTypes.shape({
      teamName: PropTypes.string,
      appName: PropTypes.string,
      testType: PropTypes.string,
      testEnvName: PropTypes.string,
      testEnvZone: PropTypes.string,
      executionDate: PropTypes.string,
      executionTime: PropTypes.string
    })
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
