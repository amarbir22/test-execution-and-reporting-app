import axios from 'axios';

import {
  GET_ERRORS,
  ADD_FILE, CLEAR_ERRORS,
  CLEAR_FILE
} from './types';

// Get current profile
// eslint-disable-next-line import/prefer-default-export
export const uploadFile = (file) => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS
  });
  dispatch({
    type: CLEAR_FILE
  });

  const formData = new FormData();
  formData.append('file', file);

  axios
    .post('/api/upload', formData)
    .then((res) => dispatch({
      type: ADD_FILE,
      payload: res.data
    }))
    .catch((err) => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
};
