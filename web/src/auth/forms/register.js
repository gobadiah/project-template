import { reduxForm } from 'redux-form';
import React from 'react';

import {
  BirthdayField,
  EmailField,
  FirstNameField,
  LastNameField,
  PasswordField,
  RankingField,
  TennisClubField,
} from '~/components/forms/fields';
import { Flex } from '~/styles';
import { Form } from '~/components/forms';
import { PureComponent } from '~/components/base';

class RegisterForm extends PureComponent {
  render() {
    return (
      <Form {...this.props}>
        <Flex>
          <FirstNameField />
          <LastNameField />
        </Flex>
        <EmailField />
        <Flex>
          <PasswordField autoComplete='new-password' />
          <PasswordField
            name='confirm_password'
            label='Password confirmation'
            autoComplete='new-password'
          />
        </Flex>
        <Flex>
          <BirthdayField />
          <RankingField />
        </Flex>
        <TennisClubField />
      </Form>
    );
  }
}

export { RegisterForm as PlainRegisterForm };

export default reduxForm({
  form: 'RegisterForm',
})(RegisterForm);
