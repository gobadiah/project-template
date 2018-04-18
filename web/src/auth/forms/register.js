import { css } from 'react-emotion';
import { reduxForm } from 'redux-form';
import React from 'react';

import {
  BirthdayField,
  EmailField,
  FemaleField,
  FirstNameField,
  LastNameField,
  LeftHandedField,
  MaleField,
  PasswordField,
  RankingField,
  RightHandedField,
  TennisClubField,
} from '~/components/forms/fields';
import { Flex } from '~/styles';
import { Form } from '~/components/forms';
import { PureComponent } from '~/components/base';
import { RoundButton } from '~/components';

class RegisterForm extends PureComponent {
  render() {
    const { t } = this.context;

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
        <Flex css='justify-content: space-between'>
          <MaleField inputClassName={css`width: 282px`} />
          <FemaleField inputClassName={css`width: 282px`} />
        </Flex>
        <Flex css='justify-content: space-between'>
          <LeftHandedField inputClassName={css`width: 282px`} />
          <RightHandedField inputClassName={css`width: 282px`} />
        </Flex>
        <RoundButton text={t('I create my account')} className={css`width: 100%`} />
      </Form>
    );
  }
}

export { RegisterForm as PlainRegisterForm };

export default reduxForm({
  form: 'RegisterForm',
})(RegisterForm);
