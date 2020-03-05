import {
  ADD_REPORT,
  CLEAR_FILE, GET_ALL_REPORTS, LOADING_ALL_REPORTS
} from '../actions/types';

const initialState = {
  reportUUID: '',
  message: '',
  reportData: {
    applicationId: '',
    testType: '',
    testEnvZone: '',
    testEnvName: ''
  },
  fileData: {
    serverFilename: '',
    serverPath: ''
  },
  reports: [],
  isLoading: true
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_REPORT:
      return {
        ...state,
        message: action.payload.message,
        reportData: action.payload.report.reportData,
        fileData: action.payload.report.fileData,
        isLoading: false
      };
    case CLEAR_FILE:
      return {
        ...state,
        fileData: {},
        isLoading: false
      };
    case GET_ALL_REPORTS:
      return {
        ...state,
        reports: action.payload.reports,
        isLoading: false
      };
    case LOADING_ALL_REPORTS:
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
}
