import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';


function AlertMessage(props) {
  const [show, setShow] = useState(true);
  const {
    alertHeading, alertMessage, isShowAlertButton, alertVariant, closeAction
  } = props;

  useEffect(() => {
    setShow(true);
  }, [alertHeading, alertMessage]); // Open alert if this is a new alert Message

  function onAlertClose() {
    setShow(false);
    if (closeAction) {
      closeAction();
    }
  }

  if (show) {
    return (
      <Alert variant={alertVariant} onClose={onAlertClose} dismissible className="mb-0 rounded">
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
  alertVariant: PropTypes.string.isRequired,
  closeAction: PropTypes.func
};

AlertMessage.defaultProps = {
  isShowAlertButton: false,
  alertHeading: null,
  closeAction: null
};

export default AlertMessage;
