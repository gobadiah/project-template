import React from 'react';

import { Page } from '~/components/base';
import hoc from '~/hoc';
import redirect from '~/utils/redirect';

class Index extends Page {
  render() {
    return (
      <div />
    );
  }
}

const initialDispatch = ({ store, res }) => {
  if (store.getState().auth.get('userId')) {
    redirect('/home', res);
  } else {
    redirect('/signin', res);
  }
};

export default hoc('index', { initialDispatch })(Index);
