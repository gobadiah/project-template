import {
  setAxiosConfig,
  createResource,
  updateResource,
} from 'redux-json-api';

import { translate } from 'react-i18next';

import createStore, { withRedux } from '~/services/redux';
import i18n from '~/services/i18n';

import { signin, register } from '~/auth';
import { config } from '~/services/axios';

import reducePromises from './reduce-promises';
import getI18nInitialProps from './i18n';
import currentUser from './current-user';

const commonProps = [
  getI18nInitialProps,
  currentUser,
];

const noop = () => ({});

export const extraDispatchProps = dispatch => ({
  setAxiosConfig: () => dispatch(setAxiosConfig(config())),
  create: data => dispatch(createResource(data)),
  update: data => dispatch(updateResource(data)),
  signin: signin(dispatch),
  register: register(dispatch),
});

export default (namespace, {
  mapStateToProps = noop,
  mapDispatchToProps = noop,
  initialDispatch = noop,
  needsLogin = true,
} = {}) => (page) => {
  const namespaces = ['common', namespace];
  // eslint-disable-next-line no-param-reassign
  page.getInitialProps = args => reducePromises({
    namespaces,
    needsLogin,
    ...args,
  })(commonProps)
    .then(firstValues => reducePromises({
      namespaces,
      needsLogin,
      ...args,
    })([initialDispatch])
      .then(secondValues => Object.assign(firstValues, secondValues)));
  return withRedux(
    createStore,
    mapStateToProps,
    (dispatch, props) => Object.assign(
      mapDispatchToProps(dispatch, props),
      extraDispatchProps(dispatch),
    ),
  )(translate(namespaces, { i18n, wait: process.browser })(page));
};
