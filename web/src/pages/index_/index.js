import React from 'react';

import { Main } from '~/components';
import { Page } from '~/components/base';
import hoc from '~/hoc';
import redirect from '~/utils/redirect';

class Index extends Page {
  render() {
    const { t } = this.props;
    return (
      <Main title={t('index:title')} />
    );
  }
}

const initialDispatch = ({ store, res }) => {
  if (store.getState().auth.get('userId')) {
    redirect(res, 'home');
  } else {
    redirect(res, 'signin');
  }
};

export default hoc('index', { initialDispatch })(Index);
