import React from 'react';
import { ToastContainer } from 'react-toastify';

import { Page } from '~/components/base';
import hoc from '~/hoc';

import { SignInForm } from '~/auth';

class SignIn extends Page {
  render() {
    const { signin } = this.props;
    return (
      <div>
        <SignInForm onSubmit={signin} />
        <ToastContainer />
      </div>
    );
  }
}

export default hoc('sign-in', { needsLogin: false })(SignIn);
