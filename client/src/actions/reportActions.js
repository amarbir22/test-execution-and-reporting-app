import axios from 'axios';
import moment from 'moment';


import {
  ADD_REPORT,
  CLEAR_ERRORS,
  DELETE_REPORT,
  GET_ALL_REPORTS,
  GET_ERRORS,
  GET_JSON_REPORT,
  GET_JSON_REPORTS,
  LOADING_ALL_REPORTS,
  LOADING_JSON_REPORT
} from './types';

// Get current profile
// eslint-disable-next-line import/prefer-default-export
export const addReport = (data) => (dispatch) => {
  const {
    teamName, appName, testType, testEnvZone, testEnvName
  } = data.metaData;
  const formData = new FormData();

  formData.append('teamName', teamName);
  formData.append('appName', appName);
  formData.append('testType', testType);
  formData.append('testEnvZone', testEnvZone);
  formData.append('testEnvName', testEnvName);
  formData.append('executionDate', moment(data.metaData.executionDate)
    .format('YYYY-MM-DD'));
  formData.append('executionTime', moment(data.metaData.executionTime)
    .format('HH:mm'));
  formData.append('isAutomated', data.isAutomated);

  if (data.reportFile) {
    formData.append('file', data.reportFile.file);
    formData.append('clientFilename', data.reportFile.metaData.clientFilename);
  }
  if (data.testNotes) {
    formData.append('testNotes', data.testNotes);
  }
  if (data.testToolName) {
    formData.append('testToolName', data.testToolName);
  }

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

export const getJsonReportByReportId = (id) => (dispatch) => {
  dispatch({ type: LOADING_JSON_REPORT });

  axios
    .get(`/api/report/jsonReport/${id}`)
    .then((res) => dispatch({
      type: GET_JSON_REPORT,
      payload: res.data
    }))
    .catch((err) => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

export const getJsonReportsByReportIds = (ids) => (dispatch) => {
  dispatch({ type: LOADING_JSON_REPORT });

  axios
    .post('/api/report/jsonReports', { ids })
    .then((res) => dispatch({
      type: GET_JSON_REPORTS,
      payload: res.data
    }))
    .catch((err) => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};

export const deleteReportById = (id) => (dispatch) => {
  axios
    .delete(`/api/report/${id}`)
    .then((res) => dispatch({
      type: DELETE_REPORT,
      payload: res.data
    }))
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
