import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import reportReducer from './reportReducer';
import teamReducer from './teamReducer';

export default combineReducers({
  report: reportReducer,
  errors: errorReducer,
  team: teamReducer
});
