import React from 'react';

import { AccountForm } from '~/auth';
import { Main } from '~/components';
import { Page } from '~/components/base';
import { Router } from '~/routes';
import hoc from '~/hoc';

import { containerClassName } from './styles';

class Account extends Page {
  render() {
    const { t, user } = this.props;
    const { create, update } = this.props;
    const onSubmit = values => update(p => p, {
      successMessage: t('You informations have been correctly saved !'),
      errorMessage: t('There was an error saving your informations'),
    })({
      type: 'users',
      id: user.id,
      attributes: values,
    });

    return (
      <Main
        title={t('account:title')}
        titleBar={t('account:Edit my informations')}
        titleBarOnClose={() => Router.pushRoute('home')}
        containerClassName={containerClassName}
      >
        <AccountForm initialValues={user} create={create} onSubmit={onSubmit} />
      </Main>
    );
  }
}

export default hoc('account')(Account);
