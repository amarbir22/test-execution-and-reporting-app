import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AlertMessage from '../common/alert-message/AlertMessage';
import { CLEAR_ERRORS, CLEAR_MESSAGE, CLEAR_TEAM_MESSAGE } from '../../actions/types';

export default () => {
  const errors = useSelector((state) => state.errors);
  const teamMessage = useSelector((state) => state.team.message);
  const reportMessage = useSelector((state) => state.report.message);


  const dispatch = useDispatch();

  // TODO: add all notifications is a array in redux
  return (
    <div>
      <div id="error-notice">
        {
          errors.errorMessage
          && (
            <AlertMessage
              alertMessage={errors.errorMessage}
              alertVariant="danger"
              closeAction={() => dispatch({ type: CLEAR_ERRORS })}
            />
          )
        }
      </div>
      <div id="team-notice">
        {
          teamMessage
          && (
            <AlertMessage
              alertMessage={teamMessage}
              alertVariant="success"
              closeAction={() => dispatch({ type: CLEAR_TEAM_MESSAGE })}
            />
          )
        }
      </div>
      <div id="report-notice">
        {
          reportMessage
          && (
            <AlertMessage
              alertMessage={reportMessage}
              alertVariant="success"
              closeAction={() => dispatch({ type: CLEAR_MESSAGE })}
            />
          )
        }
      </div>
    </div>
  );
};
