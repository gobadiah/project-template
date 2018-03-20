import React from 'react';
import { arrayOf, func, string } from 'prop-types';

import { reduxForm } from 'redux-form';

import { defaultPropTypes } from '~/components';

import {
  formatError as defaultFormatError,
  formatWarning as defaultFormatWarning,
} from './utils';

import { EmailField, PasswordField } from './fields';

const SignInForm = ({
  error,
  formatError,
  formatWarning,
  handleSubmit,
  warning,
}, { t }) => (
  <form onSubmit={handleSubmit}>
    <EmailField />
    <PasswordField />
    <input type='submit' value={t('Sign in')} />
    {formatWarning(warning, t)}
    {formatError(error, t)}
  </form>
);

SignInForm.propTypes = {
  error: arrayOf(string),
  formatError: func,
  formatWarning: func,
  handleSubmit: func.isRequired,
  warning: arrayOf(string),
};

SignInForm.defaultProps = {
  error: [],
  formatError: defaultFormatError,
  formatWarning: defaultFormatWarning,
  warning: [],
};

SignInForm.contextTypes = defaultPropTypes;

export { SignInForm as PlainSignInForm };

export default reduxForm({
  form: 'SignInForm',
})(SignInForm);
