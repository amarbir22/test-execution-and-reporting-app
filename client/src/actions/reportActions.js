import axios from 'axios';
import moment from 'moment';


import {
  GET_ERRORS,
  ADD_REPORT, GET_ALL_REPORTS,
  LOADING_ALL_REPORTS, CLEAR_ERRORS
} from './types';

// Get current profile
// eslint-disable-next-line import/prefer-default-export
export const addReport = (data) => (dispatch) => {
  const formData = new FormData();

  const executionDate = moment(data.reportData.executionDate)
    .format('YYYY-MM-DD');
  const executionTime = moment(data.reportData.executionTime)
    .format('HH:mm');

  formData.append('file', data.fileData.file);
  formData.append('teamName', data.teamName);
  formData.append('reportUUID', data.reportUUID);
  formData.append('applicationId', data.reportData.applicationId);
  formData.append('testType', data.reportData.testType);
  formData.append('testEnvZone', data.reportData.testEnvZone);
  formData.append('testEnvName', data.reportData.testEnvName);
  formData.append('clientFilename', data.fileData.clientFilename);
  formData.append('executionDate', executionDate);
  formData.append('executionTime', executionTime);


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

export const getAllReports = () => (dispatch) => {
  dispatch({ type: LOADING_ALL_REPORTS });
  dispatch({ type: CLEAR_ERRORS });

  axios
    .get('/api/report')
    .then((res) => dispatch({
      type: GET_ALL_REPORTS,
      payload: res.data
    }))
    .catch((err) => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};
