import React from 'react';

import { Link } from '~/routes';
import { Page } from '~/components/base';
import hoc from '~/hoc';

class SomePage extends Page {
  render() {
    const { t } = this.props;
    return (
      <div css='background-color: greenyellow;'>
        <div>{t('index:Hello world')}</div>
        <Link route='index'><a>Back to index</a></Link><br />
        <Link route='generate-error'><a>Generate error</a></Link><br />
        <Link route='/api'><a>Api endpoint</a></Link><br />
      </div>
    );
  }
}

export default hoc('index')(SomePage);
