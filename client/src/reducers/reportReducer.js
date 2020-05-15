import {
  ADD_REPORT,
  CLEAR_FILE,
  CLEAR_MESSAGE,
  DELETE_REPORT,
  GET_ALL_REPORTS,
  GET_JSON_REPORT,
  GET_JSON_REPORTS,
  LOADING_ALL_REPORTS
} from '../actions/types';

const initialState = {
  message: '',
  recentReport: {},
  allReports: [], // TODO Need separate State Object
  jsonReport: {},
  jsonReports: [], // TODO merge both states
  isLoading: true
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_REPORT:
      return {
        ...state,
        recentReport: action.payload.report,
        message: action.payload.message,
        isLoading: false
      };
    case CLEAR_FILE:
      return {
        ...state,
        isLoading: false
      };
    case GET_ALL_REPORTS:
      return {
        ...state,
        allReports: action.payload.reports,
        isLoading: false
      };
    case LOADING_ALL_REPORTS:
      return {
        ...state,
        isLoading: true
      };
    case GET_JSON_REPORT:
      return {
        ...state,
        jsonReport: action.payload.jsonReport,
        isLoading: false
      };
    case GET_JSON_REPORTS:
      return {
        ...state,
        jsonReports: action.payload.jsonReports,
        message: action.payload.message,
        isLoading: false
      };
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: ''
      };
    case DELETE_REPORT:
      return {
        ...state,
        allReports: state.allReports.filter((rp) => rp.id !== action.payload.report.id),
        message: action.payload.message
      };
    default:
      return state;
  }
}
