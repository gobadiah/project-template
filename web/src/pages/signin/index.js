import React from 'react';
import { ToastContainer } from 'react-toastify';

import { FacebookButton, GoogleButton, Main } from '~/components';
import { Line, SocialDiv } from '~/styles';
import { Page } from '~/components/base';
import { SignInForm } from '~/auth';
import hoc from '~/hoc';
import { Link } from '~/routes';

import { containerClassName } from './styles';

class SignIn extends Page {
  render() {
    const { t } = this.props;
    const { signin } = this.props;
    return (
      <Main
        title={t('sign-in:title')}
        titleBar={t('sign-in:Connect to your account')}
        containerClassName={containerClassName}
      >
        <SocialDiv>
          <GoogleButton />
          <FacebookButton />
        </SocialDiv>
        <Line />
        <SignInForm onSubmit={signin} />
        <Line />
        <Link route='register'>
          <a>{t('sign-in:Create your account')}</a>
        </Link>
      </Main>
    );
  }
}

export default hoc('sign-in', { needsLogin: false })(SignIn);
