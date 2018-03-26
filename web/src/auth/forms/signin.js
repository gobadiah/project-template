import React from 'react';
import { arrayOf, func, string } from 'prop-types';

import { reduxForm } from 'redux-form';

import { defaultPropTypes } from '~/components';

import { Error, Warning } from '~/components/forms';

import { EmailField, PasswordField } from '~/components/forms/fields';

const SignInForm = ({
  error,
  handleSubmit,
  warning,
}, { t }) => (
  <form onSubmit={handleSubmit}>
    <EmailField />
    <PasswordField />
    <input type='submit' value={t('Sign in')} />
    <Warning warning={warning} />
    <Error error={error} />
  </form>
);

SignInForm.propTypes = {
  error: arrayOf(string),
  handleSubmit: func.isRequired,
  warning: arrayOf(string),
};

SignInForm.defaultProps = {
  error: [],
  warning: [],
};

SignInForm.contextTypes = defaultPropTypes;

export { SignInForm as PlainSignInForm };

export default reduxForm({
  form: 'SignInForm',
})(SignInForm);
