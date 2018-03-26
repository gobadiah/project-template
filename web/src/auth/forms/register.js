import { reduxForm } from 'redux-form';
import React from 'react';

import {
  BirthdayField,
  EmailField,
  FirstNameField,
  LastNameField,
  PasswordField,
} from '~/components/forms/fields';
import { Form } from '~/components/forms';

import { PureComponent } from '~/components/base';

class RegisterForm extends PureComponent {
  render() {
    return (
      <Form {...this.props}>
        <EmailField key='email' />
        <PasswordField
          key='password'
          autoComplete='new-password'
        />
        <PasswordField
          key='confirm_password'
          name='confirm_password'
          label='Password confirmation'
          autoComplete='new-password'
        />
        <FirstNameField key='first_name' />
        <LastNameField key='last_name' />
        <BirthdayField key='birthday' />
      </Form>
    );
  }
}

export { RegisterForm as PlainRegisterForm };

export default reduxForm({
  form: 'RegisterForm',
})(RegisterForm);
