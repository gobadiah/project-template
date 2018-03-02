import React from 'react';

import { defaultPropTypes, defaultProps } from '~/components';

class Page extends React.PureComponent {
  getChildContext() {
    const { i18n, t, user } = this.props;
    return {
      i18n,
      t,
      user,
    };
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
