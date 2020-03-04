import { combineReducers } from 'redux';
import fileUploadReducer from './fileUploadReducer';
import errorReducer from './errorReducer';
import addReportReducer from './addReportReducer';

export default combineReducers({
  fileUpload: fileUploadReducer,
  addReport: addReportReducer,
  errors: errorReducer
});
