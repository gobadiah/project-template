import React from 'react';

import { AccountForm } from '~/auth';
import { Line } from '~/styles';
import { Link } from '~/routes';
import { Main } from '~/components';
import { Page } from '~/components/base';
import hoc from '~/hoc';

import { containerClassName } from './styles';

class Account extends Page {
  render() {
    const { t } = this.props;
    const { signin } = this.props;
    return (
      <Main
        title={t('account:title')}
        titleBar={t('account:Edit my informations')}
        containerClassName={containerClassName}
      >
        <AccountForm onSubmit={signin} />
        <Line />
        <Link route='register'>
          <a>{t('account:Create your account')}</a>
        </Link>
      </Main>
    );
  }
}

export default hoc('account')(Account);
