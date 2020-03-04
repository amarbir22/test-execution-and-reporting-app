import {
  ADD_REPORT,
  CLEAR_FILE
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
  isLoading: true
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_REPORT:
      return {
        ...state,
        message: action.payload.message,
        reportData: action.payload.reportData,
        fileData: action.payload.fileData,
        isLoaded: true
      };
    case CLEAR_FILE:
      return {
        ...state,
        fileData: {},
        isLoaded: false
      };
    default:
      return state;
  }
}
