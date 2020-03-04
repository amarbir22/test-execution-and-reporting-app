import axios from 'axios';

import {
  GET_ERRORS,
  ADD_REPORT
} from './types';

// Get current profile
// eslint-disable-next-line import/prefer-default-export
export const addReport = (data) => (dispatch) => {
  console.log('Form Data', data);
  const formData = new FormData();
  formData.append('file', data.fileData.file);
  formData.append('reportUUID', data.reportUUID);
  formData.append('applicationId', data.reportData.applicationId);
  formData.append('testType', data.reportData.testType);
  formData.append('testEnvZone', data.reportData.testEnvZone);
  formData.append('testEnvName', data.reportData.testEnvName);
  formData.append('clientFilename', data.fileData.clientFilename);
  formData.append('executionDate', data.reportData.executionDate._i);
  formData.append('executionTime', data.reportData.executionTime._i);


  axios
    .post('/api/report', formData)
    .then((res) => dispatch({
      type: ADD_REPORT,
      payload: res.data
    }))
    .catch((err) => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};
