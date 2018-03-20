import { translate } from 'react-i18next';

import createStore, { withRedux } from '~/redux';
import { extraDispatchProps } from '~/redux/json-api';

import i18n from '~/config/i18n';

import reducePromises from './reduce-promises';
import getI18nInitialProps from './i18n';

const commonProps = [
  getI18nInitialProps,
];

const noop = () => ({});

export default (namespace, {
  mapStateToProps = noop,
  mapDispatchToProps = noop,
} = {}) => (page) => {
  const namespaces = ['common', namespace];
  // eslint-disable-next-line no-param-reassign
  page.getInitialProps = args => reducePromises({
    namespaces,
    ...args,
  })(commonProps);
  return withRedux(
    createStore,
    mapStateToProps,
    (dispatch, props) => Object.assign(
      mapDispatchToProps(dispatch, props),
      extraDispatchProps(dispatch),
    ),
  )(translate(namespaces, { i18n, wait: process.browser })(page));
};
