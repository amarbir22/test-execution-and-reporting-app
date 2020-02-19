import { combineReducers } from 'redux';
import fileUploadReducer from './fileUploadReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  fileUpload: fileUploadReducer,
  errors: errorReducer
});
