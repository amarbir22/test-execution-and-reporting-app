import React from 'react';
import { useSelector } from 'react-redux';
import AlertMessage from '../common/alert-message/AlertMessage';

export default () => {
  const errors = useSelector((state) => state.errors);
  if (!errors.errorMessage) {
    return null;
  }
  return (
    <div>
      <AlertMessage
        alertMessage={errors.errorMessage}
        alertVariant="danger"
      />
    </div>
  );
};
