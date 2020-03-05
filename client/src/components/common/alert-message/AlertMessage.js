import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';


/**
 * @return {null}
 */
function AlertMessage(props) {
  const [show, setShow] = useState(true);
  const {
    alertHeading, alertMessage, isShowAlertButton, alertVariant
  } = props;

  if (show) {
    return (
      <Alert variant={alertVariant} onClose={() => setShow(false)} dismissible>
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
