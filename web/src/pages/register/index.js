import React from 'react';

import { FacebookButton, GoogleButton, Main } from '~/components';
import { Line, SocialDiv } from '~/styles';
import { Page } from '~/components/base';
import { RegisterForm } from '~/auth';
import hoc from '~/hoc';
import { Link } from '~/routes';

import { containerClassName } from './styles';

class Register extends Page {
  render() {
    const { t } = this.props;
    const { register } = this.props;
    return (
      <Main
        title={t('register:title')}
        titleBar={t('register:Create your account')}
        containerClassName={containerClassName}
      >
        <SocialDiv>
          <GoogleButton />
          <FacebookButton />
        </SocialDiv>
        <Line />
        <RegisterForm onSubmit={register} />
        <Line />
        <Link route='signin'><a>{t('register:Signin')}</a></Link>
      </Main>
    );
  }
}

export default hoc('register', { needsLogin: false })(Register);
