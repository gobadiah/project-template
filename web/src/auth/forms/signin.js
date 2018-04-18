import { arrayOf, bool, func, string } from 'prop-types';
import { reduxForm } from 'redux-form';
import React from 'react';

import { EmailField, PasswordField } from '~/components/forms/fields';
import { Form } from '~/components/forms';
import { Link } from '~/routes';
import { RoundButton, defaultPropTypes } from '~/components';

import { BottomContainer, ForgottenPassword, signInClassName } from './styles';

const SignInForm = (props, { t }) => (
  <Form {...props} className={signInClassName}>
    <EmailField />
    <PasswordField />
    <BottomContainer>
      <Link route='password-forgotten'>
        <ForgottenPassword>{t('Password forgotten')}</ForgottenPassword>
      </Link>
      <RoundButton
        text={t('Connect me')}
        type='submit'
        disabled={props.submitting}
      />
    </BottomContainer>
  </Form>
);

SignInForm.propTypes = {
  error: arrayOf(string),
  handleSubmit: func.isRequired,
  submitting: bool.isRequired,
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
