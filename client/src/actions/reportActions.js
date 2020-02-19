import axios from 'axios';

import {
  UPLOAD_REPORT
} from './types';

// Get current profile
export const uploadReport = () => dispatch => {
  axios
    .get('/api/upload')
    .then(res =>
      dispatch({
        type: UPLOAD_REPORT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: UPLOAD_REPORT,
        payload: {}
      })
    );
};
