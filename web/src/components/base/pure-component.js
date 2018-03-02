import React from 'react';
import PropTypes from 'prop-types';

export default class PureComponent extends React.PureComponent {
  componentDidMount() {
    const { i18n } = this.context;
    i18n.on('languageChanged', () => this.forceUpdate());
  }

  render() {
    return null;
  }
}

PureComponent.contextTypes = {
  i18n: PropTypes.shape().isRequired,
  t: PropTypes.func.isRequired,
};
