import React from 'react';

import { reduxForm } from 'redux-form';

import {
  BirthdayField,
  EmailField,
  FirstNameField,
  LastNameField,
  PasswordField,
} from './fields';
import { BaseForm } from './utils';

class RegisterForm extends BaseForm {
  getFields = () => [
    <EmailField key='email' />,
    <PasswordField
      key='password'
      autoComplete='new-password'
    />,
    <PasswordField
      key='confirm_password'
      name='confirm_password'
      label='Password confirmation'
      autoComplete='new-password'
    />,
    <FirstNameField key='first_name' />,
    <LastNameField key='last_name' />,
    <BirthdayField key='birthday' />,
  ];
}

export { RegisterForm as PlainRegisterForm };

export default reduxForm({
  form: 'RegisterForm',
})(RegisterForm);
