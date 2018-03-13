import React from 'react';
import { arrayOf, func, string } from 'prop-types';

const SignInForm = ({
  handleSubmit,
  error,
  formatError,
  t,
}) => (
  <form onSubmit={handleSubmit}>
    {formatError(t, error)}
  </form>
);

SignInForm.propTypes = {
  handleSubmit: func.isRequired,
  error: arrayOf(string),
  formatError: func,
  t: func.isRequired,
};

SignInForm.defaultProps = {
  error: [],
  formatError: (t, error) => error,
};

export default SignInForm;
