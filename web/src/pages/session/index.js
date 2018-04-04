import React from 'react';

import { Page } from '~/components/base';
import hoc from '~/hoc';

class Session extends Page {
  render() {
    const { session } = this.props;
    console.log('session', session);
    return (
      <div />
    );
  }
}

export default hoc('session', { endpoint: query =>  `/sessions/${query.id}` })(Session);
