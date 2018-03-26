import React from 'react';

import { Page } from '~/components/base';
import hoc from '~/hoc';

import { SignInForm } from '~/auth';

class SignIn extends Page {
  render() {
    const { signin } = this.props;
    return (
      <SignInForm onSubmit={signin} />
    );
  }
}

export default hoc('sign-in')(SignIn);
