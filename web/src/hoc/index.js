import { translate } from 'react-i18next';

import createStore, { withRedux } from '~/services/redux';
import i18n from '~/services/i18n';

import reducePromises from './reduce-promises';
import getI18nInitialProps from './i18n';
import currentUser from './current-user';
import setupApi from './setup-api';
import crud from './crud';
import extraDispatchToProps from './extraDispatchToProps';

const commonDispatch = [
  crud,
  setupApi,
  getI18nInitialProps,
  currentUser,
];

const noop = () => ({});

export default (namespace, {
  mapStateToProps = noop,
  mapDispatchToProps = noop,
  initialDispatch = noop,
  needsLogin = true,
  endpoint,
} = {}) => (page) => {
  const namespaces = ['common', namespace];

  // eslint-disable-next-line no-param-reassign
  page.getInitialProps = args => reducePromises({
    namespaces,
    needsLogin,
    endpoint,
    ...args,
  })(commonDispatch)
    .then(firstValues => reducePromises({
      namespaces,
      endpoint,
      needsLogin,
      ...args,
    })([initialDispatch])
      .then(secondValues => Object.assign(firstValues, secondValues)));

  return withRedux(
    createStore,
    mapStateToProps,
    (dispatch, props) => Object.assign(
      {},
      extraDispatchToProps(dispatch, props),
      mapDispatchToProps(dispatch, props),
    ),
  )(translate(namespaces, { i18n, wait: process.browser })(page));
};
