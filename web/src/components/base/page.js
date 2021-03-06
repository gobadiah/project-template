import React from 'react';

import { defaultPropTypes, defaultProps } from '../prop-types';

class Page extends React.PureComponent {
  getChildContext() {
    const { i18n, t, user } = this.props;
    return {
      i18n,
      t,
      user,
    };
  }

  componentDidMount() {
    const { setAxiosConfig } = this.props;
    setAxiosConfig();
  }

  render() {
    return null;
  }
}

Page.propTypes = {
  ...defaultPropTypes,
};

Page.childContextTypes = {
  ...defaultPropTypes,
};

Page.defaultProps = defaultProps;

export default Page;
