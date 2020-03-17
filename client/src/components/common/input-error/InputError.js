import React from 'react';
import PropTypes from 'prop-types';

const InputError = (props) => {
  const { errors } = props;
  if (!errors) {
    return null;
  }
  return (
    <div className="invalid-feedback d-block errorMsg">{errors.message}</div>
  );
};

InputError.propTypes = {
  errors: PropTypes.shape({
    message: PropTypes.string
  })
};

InputError.defaultProps = {
  errors: null
};

export default InputError;
