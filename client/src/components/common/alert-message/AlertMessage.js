import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { CLEAR_ERRORS } from '../../../actions/types';


/**
 * @return {null}
 */
function AlertMessage(props) {
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();
  const {
    alertHeading, alertMessage, isShowAlertButton, alertVariant
  } = props;

  useEffect(() => {
    setShow(true);
  }, [alertHeading, alertMessage]); // Open alert if this is a new alert Message

  function onAlertClose() {
    setShow(false);
    dispatch({ type: CLEAR_ERRORS });
  }

  if (show) {
    return (
      <Alert variant={alertVariant} onClose={onAlertClose} dismissible>
        {
          alertHeading
          && (
            <Alert.Heading>
              {alertHeading}
            </Alert.Heading>
          )
        }
        {alertMessage}
      </Alert>
    );
  }

  if (isShowAlertButton) {
    return <Button onClick={() => setShow(true)}>Show Alert</Button>;
  }
  return null;
}

AlertMessage.propTypes = {
  alertHeading: PropTypes.string,
  alertMessage: PropTypes.string.isRequired,
  isShowAlertButton: PropTypes.bool,
  alertVariant: PropTypes.string.isRequired
};

AlertMessage.defaultProps = {
  isShowAlertButton: false,
  alertHeading: null
};

export default AlertMessage;
