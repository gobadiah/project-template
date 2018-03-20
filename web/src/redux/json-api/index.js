import {
  setAxiosConfig,
  createResource,
  updateResource,
} from 'redux-json-api';

import config from '~/config';

import { signin, register } from './auth';

export * from './next';
export * from './auth';

export const extraDispatchProps = dispatch => ({
  setAxiosConfig: () => dispatch(setAxiosConfig(config.axios())),
  create: data => dispatch(createResource(data)),
  update: data => dispatch(updateResource(data)),
  signin: signin(dispatch),
  register: register(dispatch),
});
