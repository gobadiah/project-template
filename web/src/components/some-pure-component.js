import React from 'react';

import { PureComponent } from '~/components/base';

export default class SomePureComponent extends PureComponent {
  render() {
    const { t } = this.context;
    return (
      <div>{t('This is a pure component')}</div>
    );
  }
}
