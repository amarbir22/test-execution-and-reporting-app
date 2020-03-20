import React from 'react';

const ReportMetaData = (props) => {
  // eslint-disable-next-line react/prop-types
  const { id, appName } = props;

  return (
    <div id={id} className="container">
      <table>
        <tbody>
          <tr>
            <th className="small text-muted pr-2" scope="row">Team Name</th>
            <td>{appName}</td>
          </tr>
          <tr>
            <th className="small text-muted pr-2" scope="row">Team Name</th>
            <td>{appName}</td>
          </tr>
          <tr>
            <th className="small text-muted pr-2" scope="row">Team Name</th>
            <td>{appName}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ReportMetaData;
