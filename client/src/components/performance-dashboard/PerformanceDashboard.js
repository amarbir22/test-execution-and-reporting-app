import React from 'react';
import PerfReport from '../perf-report/PerfReport';
import AddReport from '../add-report/AddReport';


// eslint-disable-next-line react/prefer-stateless-function
class PerformanceDashboard extends React.Component {
  render() {
    const reportFormat = {
      headers: [
        'Label',
        'Samples',
        'Average',
        'Min',
        'Max',
        'Std Dev',
        'Error %',
        'Throughput',
        'Received',
        'Sent',
        'Avg. Bytes'
      ],
      rows: [
        'Login',
        '11',
        '2343',
        '44',
        '55',
        '33',
        '2',
        '55',
        '53',
        '33',
        '56'
      ]
    };

    return (
      <div className="container py-md-4">
        <h1>Placeholder for Performance Dashboard</h1>
        <p>Compare JMeter Reports</p>
        <AddReport />
        <table className="table">
          <thead>
            <tr>
              {
              reportFormat.headers.map((item, i) => (
                <td key={i}>{item}</td>
              ))
            }
            </tr>
          </thead>
          <tbody>
            <tr>
              {
              reportFormat.rows.map((item, j) => (
                <td key={j}>{item}</td>
              ))
            }
            </tr>
          </tbody>
        </table>
        <PerfReport />
      </div>
    );
  }
}

export default PerformanceDashboard;
