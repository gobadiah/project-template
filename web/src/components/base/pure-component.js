import React from 'react';

import { defaultPropTypes } from '~/components';

export default class PureComponent extends React.PureComponent {
  componentDidMount() {
    const { i18n } = this.context;
    i18n.on('languageChanged', () => this.forceUpdate());
  }

  render() {
    return null;
  }
}

PureComponent.contextTypes = defaultPropTypes;
