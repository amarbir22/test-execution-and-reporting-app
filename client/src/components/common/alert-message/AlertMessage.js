import React, { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import PropTypes from 'prop-types';


function AlertMessage(props) {
  const [show, setShow] = useState(true);
  const {
    alertHeading, alertMessage, alertVariant, closeAction
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
      <Alert variant={alertVariant} onClose={onAlertClose} dismissible className="alertMsg mb-0 rounded">
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

  return (null);
}

AlertMessage.propTypes = {
  alertHeading: PropTypes.string,
  alertMessage: PropTypes.string.isRequired,
  alertVariant: PropTypes.string.isRequired,
  closeAction: PropTypes.func
};

AlertMessage.defaultProps = {
  alertHeading: null,
  closeAction: null
};

export default AlertMessage;
