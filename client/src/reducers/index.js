import { combineReducers } from 'redux';
import fileUploadReducer from './fileUploadReducer';
import errorReducer from './errorReducer';
import reportReducer from './addReportReducer';

export default combineReducers({
  fileUpload: fileUploadReducer,
  report: reportReducer,
  errors: errorReducer
});
