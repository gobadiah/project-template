import React from 'react';

import { Page } from '~/components/base';
import hoc from '~/hoc';

import RegisterForm from '~/redux/form/register';

class Register extends Page {
  render() {
    const { register } = this.props;
    return (
      <RegisterForm onSubmit={register} />
    );
  }
}

export default hoc('register')(Register);
